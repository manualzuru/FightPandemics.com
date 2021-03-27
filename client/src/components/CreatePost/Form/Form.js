import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

import First from "./FirstSection";
import Second from "./SecondSection";
import Third from "./ThirdSection";
import Fourth from "./FourthSection";
import { CreatePostContext } from "components/CreatePost/CreatePost";
import { Footer, Submit } from "components/CreatePost/StyledModal";
import createPostSettings from "assets/data/createPostSettings";
import axios from "axios";
import { formDataToPost } from "assets/data/formToPostMappings";
import GTM from "constants/gtm-tags";

const { shareWith, expires, helpTypes, workMode } = createPostSettings;

const initialState = {
  formData: {
    title: "",
    description: "",
    tags: [],
    shareWith: shareWith.default.value,
    expires: expires.default.value,
    help: helpTypes.default.value,
    workMode: workMode.default.value,
  },
  errors: [],
};

const Form = ({
  setCurrentStep,
  textData,
  type,
  setPostId,
  gtmPrefix,
  onSuccess,
}) => {
  const { t } = useTranslation();
  const { form } = useContext(CreatePostContext);
  const [formData, setFormData] = useState(initialState.formData);
  const [errors, setErrors] = useState(initialState.errors);
  formData.help = type;

  const errorMsg = {
    title: t("post.title"),
    description: t("post.description"),
    help: t("post.help"),
    tags: t("post.tags"),
  };

  const handleFormData = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });

    if (errors.includes(field) && formData[field]) {
      const newErrors = errors.filter((error) => error !== field);
      setErrors(newErrors);
    }
  };

  const handleSelectorChange = (field, val) => {
    setFormData({ ...formData, [field]: val });
  };

  const cleanForm = () => setFormData(initialState.formData);

  const renderError = (field) => {
    if (errors.includes(field) && (!formData[field] || !formData[field].length))
      return errorMsg[field];
  };

  const addTag = (tag) => (e) => {
    const hasTag = formData.tags.includes(tag);
    if (hasTag) {
      const tags = formData.tags.filter((t) => t !== tag);
      setFormData({ ...formData, tags });
    } else {
      setFormData({ ...formData, tags: [...formData.tags, tag] });
    }
  };

  const populateErrors = () => {
    const newErrors = [];
    for (let field in errorMsg) {
      if (!errors.includes(field)) {
        newErrors.push(field);
      }
    }
    setErrors([...errors, ...newErrors]);
  };

  const handleSubmit = async (e) => {
    setCurrentStep(2);
    e.preventDefault();
    populateErrors();

    const payload = formDataToPost(formData);
    if (form.organisationId) payload.actorId = form.organisationId;

    if (!errors.length) {
      try {
        const res = await axios.post("/api/posts", payload);
        setPostId(res.data._id);
        onSuccess(res.data);
        cleanForm();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <First
        onChangeTitle={handleFormData("title")}
        onChangeDescription={handleFormData("description")}
        formData={formData}
        renderError={renderError}
      />
      <Second
        addTag={addTag}
        selectedTags={formData.tags}
        renderError={renderError}
        title={textData.question}
      />
      <Third
        formData={formData}
        onShareWithChange={(val) => handleSelectorChange("shareWith", val)}
        onExpirationChange={(val) => handleSelectorChange("expires", val)}
      />
      <Fourth
        formData={formData}
        onWorkModeChange={(val) => handleSelectorChange("workMode", val)}
      />
      <Footer>
        <Submit
          primary="true"
          onClick={handleSubmit}
          disabled={
            !formData.title ||
            !formData.description ||
            formData.tags.length === 0 ||
            formData.workMode === workMode.default.value
          }
          id={gtmPrefix + GTM.post.button}
        >
          {t("post.post")}
        </Submit>
      </Footer>
    </>
  );
};

export default Form;
