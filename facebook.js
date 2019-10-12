{/* <a id="loginbtn" onClick={loginWithFacebook}>sign in with facebook</a> */ }

const newLink = document.createElement('a');
newLink.setAttribute('id', 'loginbtn');
newLink.setAttribute('onClick', 'loginWithFacebook');
// newLink.textContent('hi');
// document.body.appendChild(newLink);

window.fbAsyncInit = function () {
  FB.init({
    appId: '726162967851139',
    cookie: true,
    xfbml: true,
    version: 'v1.0'
  });

  FB.AppEvents.logPageView();
  // fbSDKLoaded();
};

(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) { return; }
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// document.getElementById('loginbtn').addEventListener('click', loginWithFacebook, false)

export default function loginWithFacebook() {
  FB.login(response => {
    console.log(response);
  }, { scope: 'public_profile, email' })
  return false;
}