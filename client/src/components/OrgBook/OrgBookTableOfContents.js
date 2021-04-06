import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { theme, mq } from "../../constants/theme";
import { useTranslation } from "react-i18next";
import { WhiteSpace } from "antd-mobile";
import { Avatar } from "components/Avatar";
import BackArrowButton from "./OrgBookBackButton";
import { getInitialsFromFullName } from "utils/userInfo";
import GTM from "../../constants/gtm-tags";
import SvgIcon from "../Icon/SvgIcon";
import eyeClosedIcon from "../../assets/icons/orgbook-eye-closed.svg";
import eyeOpenIcon from "../../assets/icons/orgbook-eye-open.svg";
import lockClosedIcon from "../../assets/icons/orgbook-lock-closed.svg";
import lockOpenIcon from "../../assets/icons/orgbook-lock-open.svg";
import pageIcon from "../../assets/icons/orgbook-page.svg";
import plusIcon from "../../assets/icons/orgbook-plus.svg";
import OrgBookConfirmModal from "./OrgBookConfirmModal";

const { colors, typography } = theme;
const { white, black, lightGray, mediumGray } = colors;

const OrgBookTOCHeader = styled.div`
  background-color: rgb(120, 120, 120);
  color: ${white};
  height: 3vh;
  padding: 1.4rem 1.4rem 3.4rem 1.4rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const OrgBookTOCWrapper = styled.div`
  opacity: ${(props) => (props.selectedDirty ? "0.5" : "1")};
`;

const OrgBookHeaderLabelContainer = styled.div``;

const HeaderSpacerContainer = styled.div`
  width: 50px;
`;

const MainNavigationContainer = styled.div`
  color: ${white};
  overflow-y: auto;
  height: 600px;
  scroll-behavior: smooth;
  scrollbar-color: light;
  padding: 1.4rem 1.4rem 3.4rem 1.4rem;
`;

const OrgAvatarAndNameContainer = styled.div`
  display: inline-block;
  height: 2vh;
  padding: 2.4rem 1.4rem 3.4rem 2.4rem;
`;

const PageListContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: nowrap;
  height: 4vh;
  margin: 1.4rem 1.4rem 1.4rem 6.4rem;
  cursor: pointer;
  :hover {
    background-color: ${lightGray};
    color: ${black};
  }
  border: ${(props) => (props.selected ? "1px solid white" : "none")};
  pointer-events: ${(props) => (props.selectedDirty ? "none" : "auto")};
`;

const AddNewPageContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: nowrap;
  height: 4vh;
  margin: 1.4rem 1.4rem 1.4rem 0rem;
  cursor: pointer;
  :hover {
    background-color: ${lightGray};
    color: ${black};
  }
  pointer-events: ${(props) => (props.selectedDirty ? "none" : "auto")};
`;

const NewPageIconContainer = styled.div`
  margin-left: 6.4rem;
`;

const PageIconAndNameContainer = styled.div`
  display: flex;
  alignitems: center;
`;

const PageSvgIcon = styled(SvgIcon)`
  margin-right: 10px;
`;

const EyeIconContainer = styled.div`
  margin-left: 5%;
  justify-content: flex-end;
`;

const EyeSvgIcon = styled(SvgIcon)`
  margin-right: 2px;
`;

export const Background = styled.div`
  width: 95%;
  background-color: ${mediumGray};
`;

const OrgBookTableOfContents = (props) => {
  const {
    organisation,
    currentOrgBookPages,
    handleNewPageClick,
    showAddNewPage,
    selectPage,
    preSelectedPage,
    handleBackBtnClick,
    selectedPageDirty,
    UPDATE_ACTION_TYPES,
  } = props;
  const { t } = useTranslation();
  const [selectedPage, setSelectedPage] = useState(preSelectedPage || null);
  const [sortedCurrentOrgBookPages, setSortedCurrentOrgBookPages] = useState(
    null,
  );
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  const LIVE_PAGE_VIEW_TYPES = {
    //correspond to private, public for live pages only
    orgView: "org",
    publicView: "public",
  };
  const PAGE_CATEGORIES = {
    liveCategory: "live",
    draftCategory: "draft",
  };

  const initialize = () => {
    //sort ascending pageGroupNumber, then descending by create_at date
    const sortedPages = currentOrgBookPages.sort(
      (a, b) =>
        a.pageGroupNumber - b.pageGroupNumber ||
        Date.parse(b.created_at) - Date.parse(a.created_at),
    );
    setSortedCurrentOrgBookPages(sortedPages);
    if (preSelectedPage && !selectedPageDirty) {
      setSelectedPage(preSelectedPage);
      selectPage(preSelectedPage);
    }
  };

  useEffect(initialize, []);

  useEffect(() => {}, [selectedPageDirty]);

  const handlePageClick = (e, page) => {
    e.persist();
    e.stopPropagation();
    setSelectedPage(page);
    selectPage(page);
  };

  const onBackButtonClick = () => {
    if (selectedPageDirty) {
      setConfirmModalVisible(true);
    } else {
      handleBackBtnClick();
    }
  };

  const handleOnConfirm = async () => {
    setConfirmModalVisible(false);
    handleBackBtnClick();
  };

  const handleOnCancelConfirm = () => {
    setConfirmModalVisible(false);
  };

  const renderEyeIcon = (page) => {
    const eyeIcon =
      page.status === PAGE_CATEGORIES.draftCategory
        ? eyeClosedIcon
        : eyeOpenIcon;

    return (
      <EyeIconContainer>
        <EyeSvgIcon src={eyeIcon} />
      </EyeIconContainer>
    );
  };

  const isSelectedPage = (page) => {
    return selectedPage
      ? Object.keys(selectedPage).every((p) => selectedPage[p] === page[p])
      : false;
  };

  const renderConfirmModal = () => {
    return (
      <div>
        <OrgBookConfirmModal
          mask={false}
          action={UPDATE_ACTION_TYPES.goingBackWithDirtyPage}
          selectedPage={selectedPage}
          visible={confirmModalVisible}
          onCancelConfirm={handleOnCancelConfirm}
          onConfirm={handleOnConfirm}
          UPDATE_ACTION_TYPES={UPDATE_ACTION_TYPES}
          livePageExists={false}
          UNPUBLISH_OPTIONS={{}}
          showUnpublishOptions={false}
        />
        <Background />
      </div>
    );
  };

  if (confirmModalVisible) {
    return renderConfirmModal();
  }

  return (
    sortedCurrentOrgBookPages && (
      <OrgBookTOCWrapper selectedDirty={selectedPageDirty}>
        <OrgBookTOCHeader>
          <OrgBookHeaderLabelContainer>
            {t("orgBook.editorSpaceTOCHeader")}
          </OrgBookHeaderLabelContainer>
          <HeaderSpacerContainer />
          <BackArrowButton
            //handleClick={handleBackBtnClick}
            handleClick={onBackButtonClick}
            id={GTM.orgBook.prefix + GTM.orgBook.back}
            label={t("onboarding.common.previous")}
            color={white}
            bgcolor="transparent"
          ></BackArrowButton>
        </OrgBookTOCHeader>
        <MainNavigationContainer>
          <WhiteSpace />
          <OrgAvatarAndNameContainer>
            <Avatar>{getInitialsFromFullName(`${organisation.name}`)}</Avatar>
            {organisation.name}
          </OrgAvatarAndNameContainer>
          {sortedCurrentOrgBookPages.map((page, idx) => (
            <PageListContainer
              key={idx}
              selected={isSelectedPage(page)}
              selectedDirty={selectedPageDirty}
              onClick={(e) => {
                handlePageClick(e, page);
              }}
            >
              <PageIconAndNameContainer>
                <PageSvgIcon src={pageIcon} />
                {page.name}
              </PageIconAndNameContainer>
              <WhiteSpace visibility="hidden" />
              <WhiteSpace visibility="hidden" />
              {renderEyeIcon(page)}
            </PageListContainer>
          ))}
          {showAddNewPage ? (
            <AddNewPageContainer
              selectedDirty={selectedPageDirty}
              key={"add-new-page"}
              onClick={handleNewPageClick}
            >
              <NewPageIconContainer>
                <PageSvgIcon src={plusIcon} />
              </NewPageIconContainer>
              {t("orgBook.addNewPage")}
            </AddNewPageContainer>
          ) : (
            ""
          )}
        </MainNavigationContainer>
      </OrgBookTOCWrapper>
    )
  );
};

export default OrgBookTableOfContents;
