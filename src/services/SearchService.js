import firebase from '../config/Firebase';
import Config from '../config/Config';
import ListService from '../services/ListService';

class SearchService {
    constructor() {
        this.listService = new ListService();
    }

    //search lists by keyword
    searchListsByKeyword(keyword) {
        var user = firebase.auth().currentUser;

        if (keyword.length >= 0 && user) {
            var endCode = this.getEndCode(keyword);

            return this.listService
                .getLists()
                .where("name", ">=", keyword)
                .where("name", "<", endCode)
                //one method to search "start with" in firebase is to use >= keyword and < endcode of keyword
                //e.g. if we would like to search name start with "tob", we could implement as follows:
                //name >= "tob" and name < "toc"
                //in the above case, "tob" is keyword and "toc" is endCode
                .get()
        }
    }

    //get endCode, to support function searchListsByKeyword
    getEndCode(strSearch) {
        if (strSearch.length > 0) {
            var strlength = strSearch.length;
            var strFrontCode = strSearch.slice(0, strlength - 1);
            var strEndCode = strSearch.slice(strlength - 1, strSearch.length);

            return strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);
        }
        else {
            return "";
        }
    }
}

export default SearchService;