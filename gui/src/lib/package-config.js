export const getPackageConfig = () => {
  const locale = localStorage.getItem('locale');

  // const channelTypeZh = 'Codecraft PC WIN32';
  const channelTypeZh = 'Codecraft PC WIN64';
  // const channelTypeZh = 'Codecraft PC MAC';


  // const channelTypeEn = 'Codecraft PC WIN32 EN';
  const channelTypeEn = 'Codecraft PC WIN64 EN';
  // const channelTypeEn = 'Codecraft PC MAC EN';

  return {
    name: "Codecraft",
    internalVersion: 2,
    channelType: locale === 'zh-cn' ? channelTypeZh : channelTypeEn,
    channelVersion: "1.0.0.0",
  }
}