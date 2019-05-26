const getCookie = (key) => {
  var name = key + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

const setCookie = (key, value, expireshours) => {
  let d = new Date();
  d.setTime(d.getTime() + (expireshours * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = key + "=" + value + ";" + expires + ";path=/";
}


class CodeHandler {

  getCode() {
    let code = getCookie('code');
    return code !== '' ? code : null;
  }

  clearCode() {
    document.cookie = '';
  }

  refreshCode() {
    let code = this.getCode();
    if (typeof code === 'string') {
      setCookie('code', code, 8);
    }
  }

  registerCode(code) {
    setCookie('code', code, 8);
  }
}

export default new CodeHandler();
