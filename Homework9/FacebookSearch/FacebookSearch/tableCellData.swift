//
//  tableCellData.swift
//  FacebookSearch
//
//  Created by Biru Lyu on 4/19/17.
//  Copyright © 2017 Biru Lyu. All rights reserved.
//

import Foundation
import UIKit

class tableCellData {
    var icon = String();
    var titlename = String();
    var isFavorite = Bool();
    
    init(pic: String, name:String) {
        icon = pic
        titlename = name
        isFavorite = false
        
    }
    
    func getImage() -> String{
        return icon
    }
    
    func getName() -> String{
        return titlename
    }
    
    func setFavorite(value: Bool) -> Void {
        isFavorite = value
    }
    
    func getFavorite() -> Bool{
        return isFavorite
    }
}
