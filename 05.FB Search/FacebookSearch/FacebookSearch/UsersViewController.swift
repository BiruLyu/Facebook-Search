//
//  UsersViewController.swift
//  
//
//  Created by Biru Lyu on 4/19/17.
//
//

import UIKit
import Alamofire
import SwiftyJSON
import SwiftSpinner
import EasyToast


class UsersViewController: UIViewController, UITableViewDataSource {
    
    let data:[String] = ["Item 1", "Item 2", "Item 3", "Item 4","Item 5"]
    
    var keyword = ""

    var userList : [tableCellData] = []
    
    var Previous = ""
    var Next = ""
    
    
    @IBOutlet weak var menuButton: UIBarButtonItem!
    
    
    @IBOutlet weak var UsersTable: UITableView!
    
    @IBOutlet weak var btnPrevious: UIButton!
    @IBOutlet weak var btnNext: UIButton!
    
    @IBAction func PreviousClicked(_ sender: Any) {
        self.loadData(url: self.Previous)
        
    }
    
    @IBAction func NextClicked(_ sender: Any) {
        self.loadData(url: self.Next)
    }
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.sideMenus()
        
        // Do any additional setup after loading the view.
        SwiftSpinner.show("Loading data...")
        
        ////////////////// Ajax Call
        let url = "https://helloworld-163003.appspot.com/?Users="+keyword
        self.loadData(url: url)
        
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        //let cell = UITableViewCell()
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath) as! CustomTableViewCell
        
        //cell.textLabel?.text = "Cell!!!"
        //cell.textLabel?.text = self.data[indexPath.row]
        //cell.textLabel?.text = self.userList[indexPath.row].getName()
        //cell.imageView?.image = self.userList[indexPath.row].getImage()
        
        let pictureURL = URL(string: self.userList[indexPath.row].getImage())!
        let pictureData = NSData(contentsOf: pictureURL as URL)
        let catPicture = UIImage(data: pictureData as! Data)
        
        
        cell.photo.image = catPicture;
        cell.name.text = self.userList[indexPath.row].getName()
        
        if self.userList[indexPath.row].getFavorite() {
            
            cell.isFavorite.setImage(UIImage(named: "favorite.png"), for: UIControlState.normal)
            
            
        } else {
            
            cell.isFavorite.setImage(UIImage(named: "empty.png"), for: UIControlState.normal)
            
        }
        
        //cell.imageView?.image = catPicture;
        
        //cell.LegislatorPhoto.downloadedFrom(link: self.userList[indexPath.row].getImage())
        return cell
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        
        //return data.count
        

        
        print(self.userList.count)
        return self.userList.count
        
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
                
                self.userList = []
                if let items = json["data"].array {
                    for item in items {
                        let name = item["name"].stringValue
                        let pic = item["picture"]["data"]["url"].stringValue
                        
                        let temp = tableCellData(pic:pic, name: name)
                        self.userList.append(temp)
                        
                    }
                }
                
                //let users:[JSON] = json["data"].arrayValue
                
                //print("JSON: \(json)")
                self.UsersTable.reloadData()
                SwiftSpinner.hide()
            case .failure(let error):
                print(error)
                SwiftSpinner.hide()
            }
        }
        
    }
    
    func sideMenus() {
        if revealViewController() != nil {
            menuButton.target = revealViewController()
            menuButton.action = #selector(SWRevealViewController.revealToggle(_:))
            revealViewController().rearViewRevealWidth = 275
            revealViewController().rightViewRevealWidth = 160
            
            view.addGestureRecognizer(self.revealViewController().panGestureRecognizer())
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
