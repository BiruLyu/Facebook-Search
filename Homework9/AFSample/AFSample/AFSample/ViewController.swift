//
//  ViewController.swift
//  AFSample
//
//  Created by Biru Lyu on 4/18/17.
//  Copyright © 2017 Biru Lyu. All rights reserved.
//

import UIKit
import Alamofire
import SwiftyJSON

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
        Alamofire.request("https://codewithchris.com/code/afsample.json").responseJSON { (response) -> Void in
            //debugPrint(response)
            if let value = response.result.value{
                let json = JSON(value)
                print(json["firstkey"].stringValue)
                print(json["secondkey"].arrayValue)
            }
//            if let json = response.result.value as? NSDictionary{
//                
//                print(json["firstkey"] as! String)
//                print("JSON: \(json)")
//            }
        }
//        Alamofire.request(<#T##url: URLConvertible##URLConvertible#>).responseJSON(completionHandler: <#T##(DataResponse<Any>) -> Void#>)
//        Alamofire.request(.GET,"http://my-facebook-search.appspot.com/main.php?keyword=usc").responseJSON{
//            
//        }
        
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

