import gitHubIcon from '../../../../assets/icon/GitHub-ico.png';
import rsschoolIcon from '../../../../assets/icon/rs_school_js.svg';
import './footer.scss';

function renderFooter() {
  return `
  <footer class="footer">
    <div class="RSschool">
      <a href="https://rs.school/js/" class="link">
        <img src="${rsschoolIcon}" alt="School-icon" class="school-icon">
      </a>
    </div>
    <div class="developer">
      <a href="https://github.com/YAsereb"  class="link">
        <img src="${gitHubIcon}" class="gitHub-icon" alt="gitHub-icon">
        <p class="link-name">YAsereb</p>
      </a>
    </div>
    <div class="developer">
      <a href="https://github.com/SEvk4a"  class="link">
        <img src="${gitHubIcon}" class="gitHub-icon" alt="gitHub-icon">
        <p class="link-name">SEvk4a</p>
      </a>
    </div>
    <div class="developer">
      <a href="https://github.com/zhentosmak"  class="link">
        <img src="${gitHubIcon}" class="gitHub-icon" alt="gitHub-icon">
        <p class="link-name">zhentosmak</p>
      </a>
    </div>
    <p class="link-name">@2022</p>
  </footer>
  `;
}

export default renderFooter;
