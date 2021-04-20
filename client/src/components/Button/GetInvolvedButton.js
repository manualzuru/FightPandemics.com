import React, { useState } from "react";
import { Modal } from "antd";
import LinkButton from "./LinkButton";
import styled from "styled-components";
import { mq, theme } from "constants/theme";
const { lighterBlack } = theme.colors;
const { display, body } = theme.typography.font.family;

const StyledContainer = styled.section`
  padding: 2.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  h4 {
    font-family: ${display};
    font-size: 2.4rem;
    font-weight: 600;
    line-height: 1.17;
    text-align: center;
    margin: 0 auto;
    color: ${lighterBlack};
  }
  p {
    width: 100%;
    font-family: ${body};
    font-size: 2rem;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    margin: 0 auto;
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    color: ${lighterBlack};
  }
`;

const GetInvolvedButton = ({ getGTM, t }) => {
  // 't' comes from 'AboutUs' scope for translation
  const [visible, setVisible] = useState(false);

  const handleCancel = async (e) => {
    setVisible(false);
  };

  const showPopUp = async (e) => {
    setVisible(true);
  };

  return (
    <>
      <LinkButton
        id={getGTM("getInvolved")}
        type="primary"
        shape="round"
        onClick={showPopUp}
      >
        {t("getInvolved")}
      </LinkButton>
      <Modal
        visible={visible}
        width={564}
        footer={null}
        centered={true}
        onCancel={handleCancel}
      >
        <StyledContainer>
          <h4>{t("getInvolved")}</h4>
          <LinkButton
            type="primary"
            shape="round"
            style={{ "margin-top": "4rem" }}
            href="https://apply.workable.com/doingud"
            target="_blank"
            id={getGTM("joinVolunteer")}
          >
            {t("joinVolunteer")}
          </LinkButton>
          <LinkButton
            type="primary"
            shape="round"
            style={{ "margin-top": "4rem" }}
            href="https://apply.workable.com/doingud/j/46D6EF3B44/"
            target="_blank"
            id={getGTM("joinAmbassador")}
          >
            {t("joinAmbassador")}
          </LinkButton>
          <h4 style={{ "margin-top": "6rem" }}>{t("studentSummerProgram")}</h4>
          <p>{t("forStudentInAge")}</p>
          <LinkButton
            type="primary"
            shape="round"
            style={{ "margin-top": "4rem" }}
            href="https://apply.workable.com/doingud/j/58B157AAB2/"
            target="_blank"
            id={getGTM("joinStudentProgram")}
          >
            {t("joinStudentProgram")}
          </LinkButton>
        </StyledContainer>
      </Modal>
    </>
  );
};

export default GetInvolvedButton;
