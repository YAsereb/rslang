import './footer.scss';

function renderFooter() {
  return `
  <footer class="footer">
    <div class="RSschool">
      <a href="https://rs.school/js/" class="link">
        <img src="./assets/icon/rs_school_js.svg" alt="School-icon" class="school-icon">
      </a>
    </div>
    <div class="developer">
      <a href="https://github.com/YAsereb"  class="link">
        <img src="./assets/icon/GitHub-ico.png" class="gitHub-icon" alt="gitHub-icon">
        <p class="link-name">YAsereb</p>
      </a>
    </div>
    <div class="developer">
      <a href="https://github.com/SEvk4a"  class="link">
        <img src="./assets/icon/GitHub-ico.png" class="gitHub-icon" alt="gitHub-icon">
        <p class="link-name">SEvk4a</p>
      </a>
    </div>
    <div class="developer">
      <a href="https://github.com/zhentosmak"  class="link">
        <img src="./assets/icon/GitHub-ico.png" class="gitHub-icon" alt="gitHub-icon">
        <p class="link-name">zhentosmak</p>
      </a>
    </div>
    <p class="link-name">RSlang&nbsp2022</p>
  </footer>
  `;
}

export default renderFooter;
