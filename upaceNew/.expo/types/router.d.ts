/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/../components/timeCalc/SummaryOptionsCARD`; params?: Router.UnknownInputParams; } | { pathname: `/../components/timeCalc/SummaryOptionsCard`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/pace` | `/pace`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/timeCalc` | `/timeCalc`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/../components/timeCalc/SummaryOptionsCARD`; params?: Router.UnknownOutputParams; } | { pathname: `/../components/timeCalc/SummaryOptionsCard`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/pace` | `/pace`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/timeCalc` | `/timeCalc`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/../components/timeCalc/SummaryOptionsCARD${`?${string}` | `#${string}` | ''}` | `/../components/timeCalc/SummaryOptionsCard${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/pace${`?${string}` | `#${string}` | ''}` | `/pace${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/timeCalc${`?${string}` | `#${string}` | ''}` | `/timeCalc${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/../components/timeCalc/SummaryOptionsCARD`; params?: Router.UnknownInputParams; } | { pathname: `/../components/timeCalc/SummaryOptionsCard`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/pace` | `/pace`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/timeCalc` | `/timeCalc`; params?: Router.UnknownInputParams; };
    }
  }
}
