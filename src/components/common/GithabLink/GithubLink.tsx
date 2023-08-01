import { FC } from "react";
import "./GithubLink.scss";

import { VscGithub } from "react-icons/vsc";
import { githubLink } from "../../../constants/db";

const GithubLink: FC = () => {
  return (
    <a rel="noreferrer" target="_blank" href={githubLink}>
      <VscGithub className="icon" />
    </a>
  );
};

export default GithubLink;
