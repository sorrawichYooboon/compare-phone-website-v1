import styles from "./RegisterSection.module.scss";
import { FaUserAlt } from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";
import { SiNamecheap } from "react-icons/si";
import { RiLockPasswordFill } from "react-icons/ri";
import { Modal } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BsCheck2Circle } from "react-icons/bs";
import { useAuthentication } from "@/context/useAuthentication";
import { useTranslations } from "next-intl";
import { PATH } from "@/constants/path";
import { useState } from "react";

export default function RegisterSection() {
  const t = useTranslations();
  const router = useRouter();
  const [openRegisterSuccessModal, setOpenRegisterSuccessModal] =
    useState<boolean>(false);
  const { handleUserRegister } = useAuthentication();

  const RegisterSchema = Yup.object().shape({
    email: Yup.string().required(
      t("authentication_page.login_section.email_required")
    ),
    displayName: Yup.string()
      .matches(/^[a-zA-Z0-9ก-๙]+$/, "Only characters and number are allowed")
      .required("Please enter your display name"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required(t("authentication_page.login_section.password_required")),
    confirmPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .oneOf([Yup.ref("password")], "Password must match")
      .required(t("authentication_page.login_section.password_required")),
  });

  const onSubmit = async (
    values: any,
    { setSubmitting, setFieldError }: any
  ) => {
    try {
      await handleUserRegister(
        values.email,
        values.password,
        values.displayName
      );
      setOpenRegisterSuccessModal(true);
    } catch (error: any) {
      if (error.message.includes("email-already-in-use")) {
        setFieldError("email", "Email already in use.");
      }
      setSubmitting(false);
    }
  };

  return (
    <div className={styles["register-section"]}>
      {openRegisterSuccessModal && (
        <Modal
          centered
          open={openRegisterSuccessModal}
          closable={false}
          onCancel={() =>
            router.push({
              pathname: PATH.AUTHENTICATION_PAGE,
              query: { action: "login" },
            })
          }
          footer={null}
        >
          <div className={styles["modal__container"]}>
            <div className={styles["modal__container--register-success"]}>
              <BsCheck2Circle
                className={styles["modal__container--register-success-icon"]}
              />
              <h3
                className={styles["modal__container--register-success-title"]}
              >
                {t(
                  "authentication_page.register_section.register_success_title_modal"
                )}
              </h3>
              <p
                className={
                  styles["modal__container--register-success-description"]
                }
              >
                {t(
                  "authentication_page.register_section.register_success_description_modal"
                )}
              </p>
              <button
                className={styles["modal__container--register-success-button"]}
                onClick={() =>
                  router.push({
                    pathname: PATH.AUTHENTICATION_PAGE,
                    query: { action: "login" },
                  })
                }
              >
                {t(
                  "authentication_page.register_section.register_success_go_to_login_button"
                )}
              </button>
            </div>
          </div>
        </Modal>
      )}
      <div className={styles["register-section__container"]}>
        <div className={styles["register-section__container--header"]}>
          {t("authentication_page.register_section.title")}
        </div>
        <div className={styles["register-section__container--body"]}>
          <Formik
            validationSchema={RegisterSchema}
            initialValues={{
              email: "",
              password: "",
              confirmPassword: "",
              displayName: "",
            }}
            onSubmit={onSubmit}
            validateOnBlur={false}
            validateOnChange={false}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form
                className={styles["register-section__container--body-formik"]}
              >
                <div>
                  <div
                    className={
                      styles[
                        "register-section__container--body-formik-username"
                      ]
                    }
                  >
                    <label
                      className={
                        styles[
                          "register-section__container--body-formik-username-icon"
                        ]
                      }
                      htmlFor="email"
                    >
                      <FaUserAlt />
                    </label>
                    <Field
                      className={
                        styles[
                          "register-section__container--body-formik-username-text"
                        ]
                      }
                      type="email"
                      name="email"
                      id="email"
                      placeholder={t(
                        "authentication_page.register_section.email_placeholder"
                      )}
                    />
                  </div>
                  {errors.email && touched.email ? (
                    <div
                      className={
                        styles[
                          "register-section__container--body-formik-username-validation"
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
                          "register-section__container--body-formik-username-validation"
                        ]
                      }
                    />
                  )}
                </div>
                <div
                  className={
                    styles["register-section__container--body-formik-separator"]
                  }
                />
                <div>
                  <div
                    className={
                      styles["register-section__container--body-formik-display"]
                    }
                  >
                    <label
                      className={
                        styles[
                          "register-section__container--body-formik-display-icon"
                        ]
                      }
                      htmlFor="displayName"
                    >
                      <SiNamecheap />
                    </label>
                    <Field
                      className={
                        styles[
                          "register-section__container--body-formik-display-text"
                        ]
                      }
                      type="displayName"
                      name="displayName"
                      id="displayName"
                      placeholder={t(
                        "authentication_page.register_section.display_name_placeholder"
                      )}
                    />
                  </div>
                  {errors.displayName && touched.displayName ? (
                    <div
                      className={
                        styles[
                          "register-section__container--body-formik-display-validation"
                        ]
                      }
                    >
                      <FiAlertCircle />
                      {errors.displayName}
                    </div>
                  ) : (
                    <div
                      className={
                        styles[
                          "register-section__container--body-formik-display-validation"
                        ]
                      }
                    />
                  )}
                </div>
                <div
                  className={
                    styles["register-section__container--body-formik-separator"]
                  }
                />
                <div>
                  <div
                    className={
                      styles[
                        "register-section__container--body-formik-password"
                      ]
                    }
                  >
                    <label
                      className={
                        styles[
                          "register-section__container--body-formik-password-icon"
                        ]
                      }
                      htmlFor="password"
                    >
                      <RiLockPasswordFill />
                    </label>
                    <Field
                      className={
                        styles[
                          "register-section__container--body-formik-password-text"
                        ]
                      }
                      type="password"
                      name="password"
                      id="password"
                      placeholder={t(
                        "authentication_page.register_section.password_placeholder"
                      )}
                    />
                  </div>
                  {errors.password && touched.password ? (
                    <div
                      className={
                        styles[
                          "register-section__container--body-formik-password-validation"
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
                          "register-section__container--body-formik-password-validation"
                        ]
                      }
                    />
                  )}
                </div>
                <div
                  className={
                    styles["register-section__container--body-formik-separator"]
                  }
                />
                <div>
                  <div
                    className={
                      styles[
                        "register-section__container--body-formik-password"
                      ]
                    }
                  >
                    <label
                      className={
                        styles[
                          "register-section__container--body-formik-password-icon"
                        ]
                      }
                      htmlFor="confirmPassword"
                    >
                      <RiLockPasswordFill />
                    </label>
                    <Field
                      className={
                        styles[
                          "register-section__container--body-formik-password-text"
                        ]
                      }
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder={t(
                        "authentication_page.register_section.password_confirmation_placeholder"
                      )}
                    />
                  </div>
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <div
                      className={
                        styles[
                          "register-section__container--body-formik-password-validation"
                        ]
                      }
                    >
                      <FiAlertCircle />
                      {errors.confirmPassword}
                    </div>
                  ) : (
                    <div
                      className={
                        styles[
                          "register-section__container--body-formik-password-validation"
                        ]
                      }
                    />
                  )}
                </div>
                <button
                  className={
                    styles["register-section__container--body-formik-button"]
                  }
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Spinner speed="0.5s" />
                  ) : (
                    t("authentication_page.register_section.register_button")
                  )}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
