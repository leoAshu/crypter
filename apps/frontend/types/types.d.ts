type TradingInfoTerm = '30d' | 'alltime';

interface NavRoute {
  id: string;
  title?: string;
  icon?: { light: ImageSourcePropType; dark: ImageSourcePropType };
  route?: LinkProps['href'];
}
