import gitHubIcon from '../../../../assets/icon/GitHub-ico.png';
import rsschoolIcon from '../../../../assets/icon/rs_school_js.svg';
import './footer.scss';

function renderFooter() {
  return `
  <footer class="footer">
    <div class="RSschool">
      <a href="https://rs.school/js/">
        <img src="${rsschoolIcon}" alt="School-icon">
      </a>
    </div>
    <div class="developer">
      <a href="https://github.com/YAsereb">Serebrenikov Yaroslav
        <img src="${gitHubIcon}" class="gitHub-icon" alt="gitHub-icon">
      </a>
    </div>
    <div class="developer">
      <a href="https://github.com/SEvk4a">
        <img src="${gitHubIcon}" class="gitHub-icon" alt="gitHub-icon">
      </a>
    </div>
    <div class="developer">
      <a href="https://github.com/zhentosmak">
        <img src="${gitHubIcon}" class="gitHub-icon" alt="gitHub-icon">
      </a>
    </div>
  </footer>
  `;
}

export default renderFooter;
