import React from "react";
import Row from "../containers/RowContainer";
import Image from "next/image";
import Link from "next/link";

import MainMenuContainer from "../containers/MainMenuContainer";

const Header = ({
  refState,
  menuActive,
  wrapperRef,
  bgOne,
  bgTwo,
  mainMenuStatus,
  hasMenu,
  mainMenuItems,
  mainMenu,
  logo,
  logotype,
  logoImage,
  handleRefState,
  setTheme,
  theme,
}) => {
  return (
    <header>
      <Row
        opt={{
          isBoxed: false,
          bgColor: bgOne,
          classes: "main-header",
          numColumns: 3,
        }}
      >
        {" "}
        <Link href='/' passHref>
          <span className='left-gray-circle' />{" "}
        </Link>
        {/* Logo centralizado */}
        <Row opt={{ isBoxed: false, classes: "header-logo" }}>{logotype}</Row>
        {/* Container direito com toggle de tema e menu */}
        <div className='header-right-container'>
          {/* Toggle de tema */}
          <div className='theme-toggle-container'>
            <button
              onClick={() => setTheme("light")}
              className={`theme-toggle-btn ${
                theme === "light" ? "active" : ""
              }`}
              aria-label='Modo claro'
            >
              <Image
                src={"/brandimages/light-mode.svg"}
                alt={"Light Mode"}
                critical='true'
                className={""}
                width={24}
                height={24}
              />
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={`theme-toggle-btn ${theme === "dark" ? "active" : ""}`}
              aria-label='Modo escuro'
            >
              <Image
                src={"/brandimages/dark-mode.svg"}
                alt={"Dark Mode"}
                critical='true'
                width={24}
                height={24}
              />
            </button>
          </div>

          {/* Menu */}
          {hasMenu && mainMenuStatus === true ? (
            <>
              <div
                className={`main-header-${
                  !refState ? "visible" : "not-visible"
                }`}
              >
                <div className='header-columns toggle-menu'>
                  <button
                    type='button'
                    id='check-toggle-icon'
                    onClick={handleRefState}
                    aria-haspopup='true'
                    aria-controls='mainmenu'
                    aria-expanded={refState}
                    aria-label='Alternar visibilidade do menu'
                    className={`door resetButton  ${
                      !refState ? "active opened" : "not-active"
                    }`}
                  >
                    <Image
                      src={"/brandimages/door.png"}
                      alt={"Open Menu"}
                      critical='true'
                      width={15}
                      height={30}
                    />
                  </button>
                </div>
              </div>
              <div
                className={`main-menu main-menu-${
                  !refState ? "visible" : "not-visible"
                }`}
              >
                <MainMenuContainer
                  wrapperRef={wrapperRef}
                  refState={refState}
                  mainMenuStatus={mainMenuStatus}
                  isMobile={false}
                  mainMenuItems={mainMenu}
                  handleRefState={handleRefState}
                />
              </div>
            </>
          ) : null}
        </div>
      </Row>
    </header>
  );
};

export default Header;
