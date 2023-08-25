import { Request, Response } from "express";
import MdbCrud from "../db/mdbCrud.js";
const crud = new MdbCrud();
const {mdbFetch, mdbUpdateOne, mdbInsertOne, mdbDeleteOne} = crud;

/****** INTRINSIC OBJECTS*******/
type UserDocumentQuery = {
    name?: string,
    email?: string,
    username?: string, 
    password?: string,
    ID?: string
}
type MdbQuery = {id: string} & UserDocumentQuery

const extractMdbQuery = ({id, username, name, email, ID}:MdbQuery) => {
    const mdbQuery = id ? {ID: id}: 
        username ? {username}:
        name ? {name}:
        email ? {email}:
        ID ? {ID}:{};
    return mdbQuery;
}


/****** EXPORTS *******/

/****** POST ONE *******/
export const usersPostController = async (req:Request, res:Response) =>{
    // extract request parameter, query, body, header
    const params = req.params;
    const query:UserDocumentQuery = req.query;
    const body = req.body;
    try {
        //check body is not empty
        if(body){
            //post to db
            console.log('>>>connecting to mongodb insert')
            await mdbInsertOne("howmuch-app", "users", body)
            console.log('>>>insert sucess')
        } else {
            console.log({error:400, message: "bad request at users post"});
        }
    } catch (error){
        console.log({error, message: "internal server error at users post"});
    }
}

/****** GET MANY *******/
export const usersGetManyController = async (req:Request, res:Response) =>{
    // extract request parameter, query, body, header
    const params = req.params;
    const query:UserDocumentQuery = req.query;
    const body = req.body;
    try {
        console.log('>>>destructuring necesary params and queries')
        const {id} = params;
        const mdbQuery = extractMdbQuery({...query, id});

        console.log('>>>connecting to mongodb fetch')
        await mdbFetch("howmuch-app", "users", mdbQuery)
        console.log('>>>fetch sucess')
        
    } catch (error){
        console.log({error, message: "internal server error at users fetch many "});
    }
}

/****** GET ONE *******/
export const usersGetOneController = async (req:Request, res:Response) =>{
    // extract request parameter, query, body, header
    const params = req.params;
    const query:UserDocumentQuery = req.query;
    const body = req.body;
    try {
        //expect body is not null
        if(params || query){
            console.log('>>>destructuring necesary params and queries')
            const {id} = params;
            const mdbQuery = extractMdbQuery({...query, id});

            //expect mdbquery object keys is not undefined
            if(Object.keys(mdbQuery)[0]){
                console.log({error:400, message: "bad request at users fetch one, filter query undefined"});
                res.status(400).json({error:400, message: "bad request at users fetch one, filter query undefined"})
            };

            console.log('>>>connecting to mongodb fetch')
            await mdbFetch("howmuch-app", "users", mdbQuery)
            console.log('>>>fetch sucess')
        } else {
            console.log({error:400, message: "bad request at users fetch one"});
        }
    } catch (error){
        console.log({error, message: "internal server error at users fetch one"});
    }
}

/****** PATCH ONE *******/
export const usersPatchOneController = async (req:Request, res:Response) =>{
    // extract request parameter, query, body, header
    const params = req.params;
    const query:UserDocumentQuery = req.query;
    const body = req.body;
    try {
        //expect body is not null
        if(body){
            console.log('>>>destructuring necesary params and queries')
            const {id} = params;
            const mdbQuery = extractMdbQuery({...query, id});

            //expect mdbquery object keys is not undefined
            if(Object.keys(mdbQuery)[0]){
                console.log({error:400, message: "bad request at users patch one, filter query undefined"});
                res.status(400).json({error:400, message: "bad request at users patch one, filter query undefined"})
            };

            console.log('>>>connecting to mongodb update')
            await mdbUpdateOne("howmuch-app", "users", body, mdbQuery)
            console.log('>>>update sucess')
        } else {
            console.log({error:400, message: "bad request at users patch one"});
        }
    } catch (error){
        console.log({error, message: "internal server error at users patch one"});
    }
}

/****** DELETE ONE *******/
export const usersDeleteOneController = async (req:Request, res:Response) =>{
    // extract request parameter, query, body, header
    const params = req.params;
    const query:UserDocumentQuery = req.query;
    const body = req.body;
    try {
        //expect body is not null
        if(params){
            console.log('>>>destructuring necesary params and queries')
            const {id} = params;
            const mdbQuery = extractMdbQuery({...query, id});

            //expect mdbquery object keys is not undefined
            if(Object.keys(mdbQuery)[0]){
                console.log({error:400, message: "bad request at users delete filter query undefined"});
                res.status(400).json({error:400, message: "bad request at users delete filter query undefined"})
            };

            console.log('>>>connecting to mongodb delete')
            await mdbUpdateOne("howmuch-app", "users", body, mdbQuery)
            console.log('>>>delete sucess')
        } else {
            console.log({error:400, message: "bad request at users delete one"});
        }
    } catch (error){
        console.log({error, message: "internal server error at users delete one"});
    }
}