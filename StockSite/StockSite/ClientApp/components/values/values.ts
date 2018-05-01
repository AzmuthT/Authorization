import * as ko from 'knockout';

import * as $ from 'jquery';

import Test from './test';
import {HttpHelper} from "../../_shared/httpHelper";


class ValuesViewModel {
    // public currentCount = ko.observable(0);
    //
    // public incrementCounter() {
    //     let prevCount = this.currentCount();
    //     this.currentCount(prevCount + 1);
    // }
    public values = ko.observable();
    public tests = ko.observableArray([]);

    constructor() {
        // $.getJSON("http://localhost:5001/api/values", data => {
        //         this.values(data);
        //     }
        // );
        //
        // $.getJSON("http://localhost:5001/api/values/getobject", data => {
        //         let mapped = $.map(data, function (item) {
        //             return new Test(item)
        //         });
        //         this.tests(mapped);
        //     }
        // );
        // we need to bind the context of this to the map function
        // // otherwise when it is called as a callback, it'll have lost the meaning of 'this'
        this.map = this.map.bind(this);
        HttpHelper.getObject(this.map);
        // $.ajax({
        //     headers: {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MjUxNjcxMjYsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTAwMC8iLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAvIn0.8J6-BxXiZzOg0uXy50E3AGYAeTvmejtgj-udWisDkpo'},
        //     dataType: "json",
        //     url: "http://localhost:5001/api/values/getobject",
        //     success: data => {
        //         let mapped = $.map(data, function (item) {
        //             return new Test(item)
        //         });
        //         this.tests(mapped);
        //     }
        // });
    };
    
    public login():void{
        HttpHelper.logIn("mario","secret", ()=>{});
    }
    
    public loadData():void{
        HttpHelper.getObject(this.map);
    }

    public map(this: ValuesViewModel, data: any): void {
        let mapped = $.map(data, function (item) {
            return new Test(item)
        });
        this.tests(mapped);
    }

    // public map2 = (data: any) => {
    //      let mapped = $.map(data, function (item) {
    //          return new Test(item)
    //      });
    //      this.tests(mapped);
    //   }

}

export default {viewModel: ValuesViewModel, template: require('./values.html')};
