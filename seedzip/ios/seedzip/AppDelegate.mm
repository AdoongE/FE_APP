#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <RNKakaoLogins.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"seedzip";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  NSURL *jsCodeLocation;
  jsCodeLocation = [NSURL URLWithString:@"http://localhost:3000/index.bundle?platform=ios"];
  
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
// #if DEBUG
//   // Metro 서버의 URL을 3000 포트로 설정
//   return [NSURL URLWithString:@"http://localhost:3000/index.bundle?platform=ios"];
// #else
//   // 실제 배포 환경에서는 이미 설정된 jsBundle URL을 사용
//   return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
// #endif

}
- (BOOL)application:(UIApplication *)app
     openURL:(NSURL *)url
     options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
 if([RNKakaoLogins isKakaoTalkLoginUrl:url]) {
    return [RNKakaoLogins handleOpenUrl: url];
 }

 return NO;
}

@end
