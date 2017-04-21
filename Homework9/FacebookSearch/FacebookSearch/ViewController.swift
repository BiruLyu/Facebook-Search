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
    
    
    @IBOutlet weak var menuButton: UIBarButtonItem!
    
    
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
        self.sideMenus()
        
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    
    
    @IBOutlet weak var inputTextField: UITextField!
    
    @IBAction func searchClicked(_ sender: Any) {
        
        print("\(inputTextField.text!)")
        
        
        
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
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
        
        
        
        let barViewControllers = segue.destination as! UITabBarController
        
//        let tab0 = barViewControllers.viewControllers![0] as! UsersViewController
//        let tab1 = barViewControllers.viewControllers![1] as! PagesViewController
//        let tab2 = barViewControllers.viewControllers![2] as! EventsViewController
//        let tab3 = barViewControllers.viewControllers![3] as! PlacesViewController
//        let tab4 = barViewControllers.viewControllers![4] as! GroupsViewController
//        
//
//        tab0.keyword = self.inputTextField.text!
//        tab1.keyword = self.inputTextField.text!
//        tab2.keyword = self.inputTextField.text!
//        tab3.keyword = self.inputTextField.text!
//        tab4.keyword = self.inputTextField.text!
        
        let tab0 = barViewControllers.viewControllers![0] as! UINavigationController
        let tab1 = barViewControllers.viewControllers![1] as! UINavigationController
        let tab2 = barViewControllers.viewControllers![2] as! UINavigationController
        let tab3 = barViewControllers.viewControllers![3] as! UINavigationController
        let tab4 = barViewControllers.viewControllers![4] as! UINavigationController
        
        let user = self.storyboard?.instantiateViewController(withIdentifier: "Users") as! UsersViewController
        let page = self.storyboard?.instantiateViewController(withIdentifier: "Pages") as! PagesViewController
        let event = self.storyboard?.instantiateViewController(withIdentifier: "Events") as! EventsViewController
        let place = self.storyboard?.instantiateViewController(withIdentifier: "Places") as! PlacesViewController
        let group = self.storyboard?.instantiateViewController(withIdentifier: "Groups") as! GroupsViewController
        user.keyword = self.inputTextField.text!
        page.keyword = self.inputTextField.text!
        event.keyword = self.inputTextField.text!
        place.keyword = self.inputTextField.text!
        group.keyword = self.inputTextField.text!
        
        tab0.pushViewController(user, animated: true)
        tab1.pushViewController(page, animated: true)
        tab2.pushViewController(event, animated: true)
        tab3.pushViewController(place, animated: true)
        tab4.pushViewController(group, animated: true)
        
        self.tabBarController?.selectedIndex = 4
       
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

