import './header.scss';

function renderHeader() {
  return `
  <header class="header">
      <a href="#" class="home-button"></a>
      <a href="#sign-in" id="sign-up" class="sign-up-button">Sign up</a>
  </header>
 `;
}
export default renderHeader;
