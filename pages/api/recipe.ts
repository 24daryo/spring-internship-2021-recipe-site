import { NextApiRequest,NextApiResponse } from "next";

export default function (req: NextApiRequest, res: NextApiResponse){
    res.json({id:1})
}