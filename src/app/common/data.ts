

export class DataResource {
    private url:any;
    constructor(){
    }
    setUrl(url:string){
        this.url = url;
    }
    getUrl():string{
        return this.url;
    }
}