import { Request, Response, NextFunction } from 'express';
export function defaultConfig(req: Request, res: Response, next: NextFunction): Response | undefined{
  let headers = req.headers;
  let FrontEndUrl = process.env.FRONTENDURL!;
  console.log(headers);
  if(!headers.authority! || !headers.origin! || !headers.referer! || !headers["user-agent"]!){
    return res.status(400).json({
      message: "No permission to access this source"
    })
  }
  else {
    try{
      let originURL: string[] = [req.headers.origin!, req.headers.authority!, req.headers.referer!] as string[];
      for(let uri of originURL){
        let urlObject = new URL(uri);
        if(urlObject.origin !== FrontEndUrl){
          return res.status(400).json({
            message: "Cross Origin Request Not Supported"
          })
        }
      }
    } catch(error: any){
      return res.status(error.code || 400).json({
        message: "Bad Request"
      })
    }
  }
}