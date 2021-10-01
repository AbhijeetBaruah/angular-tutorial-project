import { AppError } from "./app-error";
import { BadRequestError } from "./bad-request";
import { NotFoundError } from "./not-found";

export class AlertErrors{
    static notFound(error:AppError){
        alert('Not Found Error');
    }
    static badRequest(error:AppError){
        alert('Bad Request Error');
    }
    static unexpectedError(error:AppError){
        alert("Unexpected Bad error");
        console.log(error);
    }
    static handleError(error:AppError){
        if(error instanceof NotFoundError){
            AlertErrors.notFound(error);
          }else if(error instanceof BadRequestError){
            AlertErrors.badRequest(error);
          }
          else{
            AlertErrors.unexpectedError(error);
          }
    }
}