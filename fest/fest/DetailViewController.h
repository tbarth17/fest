//
//  DetailViewController.h
//  fest
//
//  Created by Oliver Gill on 13/11/2014.
//  Copyright (c) 2014 Oliver Gill. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface DetailViewController : UIViewController

@property (strong, nonatomic) id detailItem;
@property (weak, nonatomic) IBOutlet UILabel *detailDescriptionLabel;

@end

