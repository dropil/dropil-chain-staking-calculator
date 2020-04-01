export const tools = {  
  localStorage: {
    set (key, value) {
      window.localStorage.setItem(key, value)
    },
    get (key) {
      return window.localStorage.getItem(key)
    },
    remove (key) {
      window.localStorage.removeItem(key)
    },
    delete (key) {
      window.localStorage.removeItem(key)
    }
  },
  toastrSuccess (message = 'Operation successfully completed', moreOptions = {}) {
    tools.toastr({ type: 'success', message, moreOptions })
  },
  toastrError (message = 'Something went wrong, please try again or contact support', moreOptions = {}) {    
    tools.toastr({ type: 'error', message, moreOptions })
  },
  toastrWarning (message, moreOptions = {}) {
    tools.toastr({ type: 'warning', message, moreOptions })
  },
  toastr ({ type = 'error', title = '', message = '', position = 'topRight', timeout = 5000, moreOptions = {} }) {
    if (!title) {
      switch (type) {
        case 'error':
          title = 'Error!'
          break;
        case 'success':
          title = 'Success!'
          break;
        case 'warning':
          title = 'Warning!'
          break;
      }    
    }      

    let defaultOptions = {
      closeOnClick: true,
      closeOnEscape: true,
      displayMode: 2,
      layout: 1,
      pauseOnHover: true,
      maxWidth: 600,
      transitionIn: 'bounceInLeft',
      transitionOut: 'fadeOutRight',
      transitionInMobile: 'fadeInDown',
      transitionOutMobile: 'fadeOutUp'
    }

    window.vm.$toast[type](message, title, { ...defaultOptions, position, timeout, ...moreOptions })
  },  
  callAfter(fn, timeout = 1000) {
    setTimeout(fn, timeout)
  },
  fadeOut(fnBefore, fnAfter, timeout = 500) {
    fnBefore()
    tools.callAfter(fnAfter, timeout)
  },
  successCheckmark(fnBefore, fnAfter) {
    fnBefore()
    tools.callAfter(fnAfter, 750)
  },
  randomString (length = 12) {
    let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let charsAndNums = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    
    let result = '';
    for (let i = length; i > 0; --i) {
      if (i === length) result += chars[Math.floor(Math.random() * chars.length)]
      else result += charsAndNums[Math.floor(Math.random() * chars.length)]
    }      

    return result;
  },
  unixFromDate (date) {
    return date.getTime()
  },
  unixNowLocal () {
    return Date.now()
  },
  unixNowUTC () {
    let date = new Date()
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds()).getTime()
  },
  updateUrl (url, _this) {
    window.history.pushState(null, null, url)
    if (_this) _this.$root.$emit('update-url', url)
  },
  formatPercent(percent) {
    return (parseFloat(percent) * 100).toLocaleString('en-US', { maximumFractionDigits: 2 }) + '%'
  },
  async fetch(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
  },
  getTheme () {
    if (!tools.localStorage.get('theme')) tools.setTheme('light')
    return tools.localStorage.get('theme') || 'light'
  },
  setTheme (theme) {
    tools.localStorage.set('theme', theme)
  },
  addCss (fileName, id) {    
    var head = document.head
    var link = document.createElement('link')

    link.type = 'text/css'
    link.rel = 'stylesheet'
    link.href = fileName
    link.id = id

    head.appendChild(link)
    
  },
  toggleTheme (t) {
    switch (tools.getTheme()) {
      case 'light':
        if (document.getElementById('dark-theme') && document.getElementById('light-theme')) {
          // remove light theme because dark theme already exists
          // this is most likely due to clicking toggle multiple times
          document.getElementById('light-theme').remove()
        } 
        else if (!document.getElementById('dark-theme') && document.getElementById('light-theme')) {
          // add dark theme to override light theme
          tools.addCss('/assets/css/dark.min.css', 'dark-theme')

          // remove light theme after transition is complete
          setTimeout(() => {
            // only remove light theme if the theme is still set to dark in cookies
            if (tools.getTheme() === 'dark') 
              document.getElementById('light-theme').remove()
          }, 1000)
        }
        else if (!document.getElementById('dark-theme') && !document.getElementById('light-theme')) {
          // add dark theme because no theme exists
          tools.addCss('/assets/css/dark.min.css', 'dark-theme')
        }
        
        // set current theme to dark in cookies
        tools.setTheme('dark')          

        break
      case 'dark':
        if (document.getElementById('light-theme') && document.getElementById('dark-theme')) {
          // remove dark theme because light theme already exists
          // this is most likely due to clicking toggle multiple times
          document.getElementById('dark-theme').remove()
        } 
        else if (!document.getElementById('light-theme') && document.getElementById('dark-theme')) {
          // add light theme to override dark theme
          tools.addCss('/assets/css/light.min.css', 'light-theme')

          // remove dark theme after transition is complete
          setTimeout(() => {
            // only remove dark theme if the theme is still set to light in cookies
            if (tools.getTheme() === 'light') 
              document.getElementById('dark-theme').remove()
          }, 1000)
        }
        else if (!document.getElementById('light-theme') && !document.getElementById('dark-theme')) {
          // add light theme because no theme exists
          tools.addCss('/assets/css/light.min.css', 'light-theme')
        }
        
        // set current theme to light in cookies
        tools.setTheme('light')
        
        break
    }

    t.$root.$emit('switchTheme')
  }
}

export default tools
