//
//  ViewController.swift
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

class ViewController: UIViewController {
    
       override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    
    @IBOutlet weak var inputTextField: UITextField!
    
    @IBAction func searchClicked(_ sender: Any) {
        
        print("\(inputTextField.text!)")
        
        
        
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
        
        
        
        let barViewControllers = segue.destination as! UITabBarController
        let tab0 = barViewControllers.viewControllers![0] as! UsersViewController
        let tab1 = barViewControllers.viewControllers![1] as! PagesViewController
        let tab2 = barViewControllers.viewControllers![2] as! EventsViewController
        let tab3 = barViewControllers.viewControllers![3] as! PlacesViewController
        let tab4 = barViewControllers.viewControllers![4] as! GroupsViewController
        

        tab0.keyword = self.inputTextField.text!
        tab1.keyword = self.inputTextField.text!
        tab2.keyword = self.inputTextField.text!
        tab3.keyword = self.inputTextField.text!
        tab4.keyword = self.inputTextField.text!
        
//        let destinationViewController = nav.viewControllers[0] as! YourViewController
//        destinationViewController.varTest = _varValue
//        
//        
//        if let destination = segue.destination as? UITabBarController {
//            let svc =
//            let svc = destination.selectedViewController as? UsersViewController
//            svc?.keyword = inputTextField.text!
//        }
        
//        let tabBarController = segue.destination as？ UITabBarController
//        let svc = tabBarController.childViewControllers[0] as UsersViewController
//        let svc = tabBarController.viewControllers![0] as UsersViewController
//        
//        
//        if segue.identifier == "showSearchResults" {
//            if let destination = segue.destination as? myUITabBarController {
//                destination.keyword = inputTextField.text!
//            }
//        }
        
    }

}

