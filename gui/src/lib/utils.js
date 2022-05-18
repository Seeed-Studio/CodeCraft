// 输入正则校验
export const regExp = {
  email: /[^\d\a-z_@.-]/g,
};

// 校验email格式
export function checkEmail(email) {
  const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
  return reg.test(email);
}

// 打开新窗口
export function openNewWindow(url) {
  if (url) {
    window.open(url, '_blank');
  }
}

// 文件下载
export function download(url) {
  const downloadLink = document.createElement('a');
  document.body.appendChild(downloadLink);
  downloadLink.href = url;
  downloadLink.download = '';
  downloadLink.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(downloadLink);
}

export function currentTime() {
  var time = new Date()
  var year = time.getFullYear();
  var month = time.getMonth() + 1;
  var day = time.getDate();
  var hour = time.getHours();
  var minute = time.getMinutes();
  var second = time.getSeconds();
  var timeStr =
    (year) + '-' +
    (month < 10 ? '0' + month : month) + '-' +
    (day < 10 ? '0' + day : day) + ' ' +
    (hour < 10 ? '0' + hour : hour) + ':' +
    (minute < 10 ? '0' + minute : minute) + ':' +
    (second < 10 ? '0' + second : second) ;
  return timeStr;
}

// 判断url是否http开头
export function startWithHttp(url) {
  if (!url) {
    return;
  }
  if (url.substr(0, 4).toLowerCase() === 'http') {
    return url;
  } else {
    return 'https://' + url;
  }
}

// 数组通过sortNum排序
export function sortWithSortNo(arr) {
  var flag;
  for (var i = 0; i < arr.length - 1; i++) {
    flag = false;
    for (var j = 0; j < arr.length - 1; j++) {
      if (
        ((arr[j + 1].sortNo !== undefined) || (arr[j + 1].sortNo !== null) || (arr[j + 1].sortNo !== '')) &&
        ((arr[j].sortNo !== undefined) || (arr[j].sortNo !== null) || (arr[j].sortNo !== '')) &&
        arr[j].sortNo &&
        (arr[j + 1].sortNo < arr[j].sortNo)) {
        let temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
        flag = true;
      }
    }
    if (!flag) {
      return arr;
    }
  }
  return arr;
}

export function sortByNoReverse(list) {
  let newList = [...list];
  newList = newList.sort(
    (a, b) => { return b.sortNo - a.sortNo });
  return newList;
}

// 对字符串进行回车剪切，返回数组
export function textToArr(text) {
  const textList = text && text.split('\n') || [];
  // 此处要循环遍历两次，遍历一次有漏掉的情况
  textList.map((item, index) => {
    if (!item) {
      textList.splice(index, 1);
    }
  });
  textList.map((item, index) => {
    if (!item) {
      textList.splice(index, 1);
    }
  });
  return textList;
}
// 生成UUID
export function productUUID() {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
}