//
//  EventsViewController.swift
//  FacebookSearch
//
//  Created by Biru Lyu on 4/19/17.
//  Copyright © 2017 Biru Lyu. All rights reserved.
//

import UIKit
import Alamofire
import SwiftyJSON
import SwiftSpinner
import EasyToast


class EventsViewController: UIViewController, UITableViewDataSource {
    
    var keyword = ""
    
    var eventList : [tableCellData] = []
    
    var Previous = ""
    var Next = ""
    
    @IBOutlet weak var EventsTable: UITableView!
    
    @IBOutlet weak var btnPrevious: UIButton!
    @IBOutlet weak var btnNext: UIButton!
    
    
    @IBAction func previousClicked(_ sender: Any) {
        self.loadData(url: self.Previous)
        
    }
    @IBAction func nextClicked(_ sender: Any) {
        self.loadData(url: self.Next)
    }
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        
        SwiftSpinner.show("Loading data...")
        
        ////////////////// Ajax Call
        
        let url = "https://helloworld-163003.appspot.com/?Events="+keyword
        self.loadData(url: url)

        
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath) as! CustomTableViewCell
        
        
        let pictureURL = URL(string: self.eventList[indexPath.row].getImage())!
        let pictureData = NSData(contentsOf: pictureURL as URL)
        let catPicture = UIImage(data: pictureData as! Data)
        
        
        cell.photo.image = catPicture;
        cell.name.text = self.eventList[indexPath.row].getName()
        
        if self.eventList[indexPath.row].getFavorite() {
            
            cell.isFavorite.setImage(UIImage(named: "favorite.png"), for: UIControlState.normal)
            
            
        } else {
            
            cell.isFavorite.setImage(UIImage(named: "empty.png"), for: UIControlState.normal)
            
        }
        
        
        return cell
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        
        print(self.eventList.count)
        return self.eventList.count
        
    }
    
    ///////////////////////////////////////////////////////////////////////////////////////////
    
    func previousAndNext() -> Void {
        
        if self.Previous == "" {
            
            self.btnPrevious.isEnabled = false
        }
        if self.Next == ""{
            self.btnNext.isEnabled = false
        }
        if self.Previous != "" && self.Next != ""{
            self.btnPrevious.isEnabled = true
            self.btnNext.isEnabled = true
            
        }
    }
    
    func loadData(url:String) -> Void {
        
        Alamofire.request(url, method: .get).validate().responseJSON { response in
            switch response.result {
            case .success(let value):
                let json = JSON(value)
                
                self.Previous = json["paging"]["previous"].stringValue
                self.Next = json["paging"]["next"].stringValue
                
                self.previousAndNext()
                
                self.eventList = []
                if let items = json["data"].array {
                    for item in items {
                        let name = item["name"].stringValue
                        let pic = item["picture"]["data"]["url"].stringValue
                        
                        let temp = tableCellData(pic:pic, name: name)
                        self.eventList.append(temp)
                        
                    }
                }
                
                //let users:[JSON] = json["data"].arrayValue
                
                //print("JSON: \(json)")
                self.EventsTable.reloadData()
                SwiftSpinner.hide()
            case .failure(let error):
                print(error)
                SwiftSpinner.hide()
            }
        }
        
    }

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
