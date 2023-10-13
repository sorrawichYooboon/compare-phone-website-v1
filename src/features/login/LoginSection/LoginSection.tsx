import styles from "./LoginSection.module.scss";
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FiAlertCircle } from "react-icons/fi";
import * as Yup from "yup";
import { useAuthentication } from "@/context/useAuthentication";
import { useTranslations } from "next-intl";
import { Modal } from "antd";
import { SiMinutemailer } from "react-icons/si";
import { RiLockPasswordLine } from "react-icons/ri";
import { useState } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function LoginSection() {
  const t = useTranslations();
  const [
    openResendVerificationEmailSuccessModal,
    setOpenResendVerificationEmailSuccessModal,
  ] = useState(false);
  const [isOpenResetPasswordModal, setIsOpenResetPasswordModal] =
    useState(false);
  const [isResendProcessing, setIsResendProcessing] = useState(false);
  const [isSendResetPasswordSuccess, setIsSendResetPasswordSuccess] =
    useState(false);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const {
    handleUserLogin,
    handleResendVerificationEmail,
    handleResetPassword,
  } = useAuthentication();
  const LoginSchema = Yup.object().shape({
    email: Yup.string().required(
      t("authentication_page.login_section.email_required")
    ),
    password: Yup.string().required(
      t("authentication_page.login_section.password_required")
    ),
  });

  const handleResendVerificationEmailOnClick = async (
    email: string,
    password: string
  ) => {
    setIsResendProcessing(true);
    setOpenResendVerificationEmailSuccessModal(true);
    if (handleResendVerificationEmail) {
      setTimeout(async () => {
        try {
          await handleResendVerificationEmail(email, password);
        } catch (error: any) {
          throw new Error(error.message);
        }
        setIsResendProcessing(false);
      }, 60000);
    }
  };

  const onSubmit = async (
    values: any,
    { setSubmitting, setFieldError }: any
  ) => {
    try {
      await handleUserLogin(values.email, values.password);
    } catch (error: any) {
      if (error.message.includes("user-not-found")) {
        setFieldError(
          "email",
          t("authentication_page.login_section.user_not_found")
        );
      } else if (error.message.includes("email-not-verified")) {
        setFieldError(
          "email",
          <div>
            Email not verified,&nbsp;
            <a
              className={styles["resend-verification-email"]}
              onClick={() => {
                setFieldError("email", "");
                handleResendVerificationEmailOnClick(
                  values?.email,
                  values?.password
                );
              }}
            >
              Resend verification email
            </a>
          </div>
        );
      } else if (error.message.includes("wrong-password")) {
        setFieldError(
          "password",
          t("authentication_page.login_section.invalid_password")
        );
      } else if (error.message.includes("too-many-requests")) {
        setFieldError(
          "email",
          t("authentication_page.login_section.too_many_attempts")
        );
        setFieldError(
          "password",
          t("authentication_page.login_section.too_many_attempts")
        );
      }
      setTimeout(() => {
        setSubmitting(false);
      }, 3000);
    }
  };

  const ResendVerificationEmailModal = () => {
    return (
      <Modal
        centered
        open={openResendVerificationEmailSuccessModal}
        closable={false}
        onCancel={() => setOpenResendVerificationEmailSuccessModal(false)}
        footer={null}
      >
        <div className={styles["modal__container"]}>
          <div
            className={styles["modal__container--resend-verification-success"]}
          >
            <SiMinutemailer
              className={
                styles["modal__container--resend-verification-success-icon"]
              }
            />
            {isResendProcessing ? (
              <>
                <h3
                  className={
                    styles[
                      "modal__container--resend-verification-success-title"
                    ]
                  }
                >
                  {t("authentication_page.login_section.resend_email_cooldown")}
                </h3>
                <div
                  className={
                    styles[
                      "modal__container--resend-verification-success-spinner"
                    ]
                  }
                >
                  <Spin indicator={antIcon} />
                </div>
              </>
            ) : (
              <>
                <h3
                  className={
                    styles[
                      "modal__container--resend-verification-success-title"
                    ]
                  }
                >
                  {t(
                    "authentication_page.login_section.resend_email_success_title"
                  )}
                </h3>
                <p
                  className={
                    styles[
                      "modal__container--resend-verification-success-description"
                    ]
                  }
                >
                  {t(
                    "authentication_page.login_section.resend_email_success_description"
                  )}
                </p>
                <button
                  className={
                    styles[
                      "modal__container--resend-verification-success-button"
                    ]
                  }
                  onClick={() =>
                    setOpenResendVerificationEmailSuccessModal(false)
                  }
                >
                  {t(
                    "authentication_page.login_section.resend_email_success_button"
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </Modal>
    );
  };

  const resetPasswordSchema = Yup.object().shape({
    email: Yup.string().required(
      t("authentication_page.login_section.email_required")
    ),
  });

  const onSubmitResetPassword = async (
    values: any,
    { setSubmitting, setFieldError }: any
  ) => {
    setSubmitting(true);
    if (handleResetPassword) {
      try {
        await handleResetPassword(values.email);
      } catch (error) {
        console.log(error);
      }
    }
    setIsSendResetPasswordSuccess(true);
    setSubmitting(false);
  };

  const ResendForgetPassword = () => {
    return (
      <Modal
        centered
        open={isOpenResetPasswordModal}
        closable={false}
        onCancel={() => {
          setIsSendResetPasswordSuccess(false);
          setIsOpenResetPasswordModal(false);
        }}
        footer={null}
      >
        <div className={styles["modal__container"]}>
          <div className={styles["modal__container--reset-password-success"]}>
            <RiLockPasswordLine
              className={
                styles["modal__container--reset-password-success-icon"]
              }
            />

            {isSendResetPasswordSuccess ? (
              <>
                <h3
                  className={
                    styles["modal__container--reset-password-success-title"]
                  }
                >
                  {t(
                    "authentication_page.login_section.send_reset_password_success_modal"
                  )}
                </h3>
                <p
                  className={
                    styles[
                      "modal__container--reset-password-success-description"
                    ]
                  }
                >
                  {t(
                    "authentication_page.login_section.send_reset_password_success_modal_description"
                  )}
                </p>
                <button
                  className={
                    styles["modal__container--reset-password-success-button"]
                  }
                  onClick={() => {
                    setIsSendResetPasswordSuccess(false);
                    setIsOpenResetPasswordModal(false);
                  }}
                >
                  {t(
                    "authentication_page.login_section.send_reset_password_success_modal_button"
                  )}
                </button>
              </>
            ) : (
              <>
                <h3
                  className={
                    styles["modal__container--reset-password-success-title"]
                  }
                >
                  {t(
                    "authentication_page.login_section.forgot_password_modal_title"
                  )}
                </h3>
                <Formik
                  className={
                    styles["modal__container--reset-password-success--form"]
                  }
                  onSubmit={onSubmitResetPassword}
                  initialValues={{ email: "" }}
                  validationSchema={resetPasswordSchema}
                  validateOnBlur={false}
                  validateOnChange={false}
                >
                  {({ isSubmitting, errors, touched }) => (
                    <Form
                      className={
                        styles[
                          "modal__container--reset-password-success--form-inner"
                        ]
                      }
                    >
                      <div
                        className={
                          styles[
                            "modal__container--reset-password-success--form-inner-field"
                          ]
                        }
                      >
                        <div
                          className={
                            styles[
                              "modal__container--reset-password-success--form-inner-field-body-formik-username"
                            ]
                          }
                        >
                          <label
                            className={
                              styles[
                                "modal__container--reset-password-success--form-inner-field-body-formik-username-icon"
                              ]
                            }
                            htmlFor="email"
                          >
                            <FaUserAlt />
                          </label>
                          <Field
                            className={
                              styles[
                                "modal__container--reset-password-success--form-inner-field-body-formik-username-text"
                              ]
                            }
                            type="email"
                            name="email"
                            id="email"
                            placeholder={t(
                              "authentication_page.login_section.email_placeholder"
                            )}
                          />
                        </div>
                        {errors.email && touched.email ? (
                          <div
                            className={
                              styles[
                                "modal__container--reset-password-success--form-inner-field-body-formik-username-validation"
                              ]
                            }
                          >
                            <FiAlertCircle />
                            {errors.email}
                          </div>
                        ) : (
                          <div
                            className={
                              styles[
                                "modal__container--reset-password-success--form-inner-field-body-formik-username-validation"
                              ]
                            }
                          />
                        )}
                      </div>

                      <button
                        className={
                          styles[
                            "modal__container--reset-password-success-button"
                          ]
                        }
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <Spin indicator={antIcon} />
                        ) : (
                          t(
                            "authentication_page.login_section.forgot_password_modal_button"
                          )
                        )}
                      </button>
                    </Form>
                  )}
                </Formik>
              </>
            )}
          </div>
        </div>
      </Modal>
    );
  };

  return (
    <div className={styles["login-section"]}>
      {openResendVerificationEmailSuccessModal && (
        <ResendVerificationEmailModal />
      )}
      {isOpenResetPasswordModal && <ResendForgetPassword />}
      <div className={styles["login-section__container"]}>
        <div className={styles["login-section__container--header"]}>
          {t("authentication_page.login_section.title")}
        </div>
        <div className={styles["login-section__container--body"]}>
          <Formik
            validationSchema={LoginSchema}
            initialValues={{ email: "", password: "" }}
            onSubmit={onSubmit}
            validateOnBlur={false}
            validateOnChange={false}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className={styles["login-section__container--body-formik"]}>
                <div>
                  <div
                    className={
                      styles["login-section__container--body-formik-username"]
                    }
                  >
                    <label
                      className={
                        styles[
                          "login-section__container--body-formik-username-icon"
                        ]
                      }
                      htmlFor="email"
                    >
                      <FaUserAlt />
                    </label>
                    <Field
                      className={
                        styles[
                          "login-section__container--body-formik-username-text"
                        ]
                      }
                      type="email"
                      name="email"
                      id="email"
                      placeholder={t(
                        "authentication_page.login_section.email_placeholder"
                      )}
                    />
                  </div>
                  {errors.email && touched.email ? (
                    <div
                      className={
                        styles[
                          "login-section__container--body-formik-username-validation"
                        ]
                      }
                    >
                      <FiAlertCircle />
                      {errors.email}
                    </div>
                  ) : (
                    <div
                      className={
                        styles[
                          "login-section__container--body-formik-username-validation"
                        ]
                      }
                    />
                  )}
                </div>
                <div
                  className={
                    styles["login-section__container--body-formik-separator"]
                  }
                />
                <div>
                  <div
                    className={
                      styles["login-section__container--body-formik-password"]
                    }
                  >
                    <label
                      className={
                        styles[
                          "login-section__container--body-formik-password-icon"
                        ]
                      }
                      htmlFor="password"
                    >
                      <RiLockPasswordFill />
                    </label>
                    <Field
                      className={
                        styles[
                          "login-section__container--body-formik-password-text"
                        ]
                      }
                      type="password"
                      name="password"
                      id="password"
                      placeholder={t(
                        "authentication_page.login_section.password_placeholder"
                      )}
                    />
                  </div>
                  {errors.password && touched.password ? (
                    <div
                      className={
                        styles[
                          "login-section__container--body-formik-password-validation"
                        ]
                      }
                    >
                      <FiAlertCircle />
                      {errors.password}
                    </div>
                  ) : (
                    <div
                      className={
                        styles[
                          "login-section__container--body-formik-password-validation"
                        ]
                      }
                    />
                  )}
                </div>
                <button
                  className={
                    styles["login-section__container--body-formik-button"]
                  }
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Spin indicator={antIcon} />
                  ) : (
                    t("authentication_page.login_section.submit_button")
                  )}
                </button>
              </Form>
            )}
          </Formik>
          <button
            className={styles["login-section__container--body-extend"]}
            onClick={() => setIsOpenResetPasswordModal(true)}
          >
            {t("authentication_page.login_section.forgot_password")}
          </button>
        </div>
      </div>
    </div>
  );
}
