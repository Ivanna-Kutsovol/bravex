'use client'

import React from "react";
import stl from "./footer.module.scss";
import Image from "next/image";

import Viber from "@/public/img/footer/viber.svg"; 

export default function Footer() {
  return (
    <footer id="footer" className={stl.footer}>
      <div className={stl.footer__content}>
        <div className={stl.footer__links}>
          <h1 className={stl.footer__title}>Catalog</h1>
          <a className={stl.footer__link} href="#">Catalogo</a>
          <a className={stl.footer__link} href="#">Escaleras</a>
          <a className={stl.footer__link} href="#">Muebles</a>
          <a className={stl.footer__link} href="#">Materiales de decoracion</a>
          <a className={stl.footer__link} href="#">Stretch ceilings</a>
          <a className={stl.footer__link} href="#">Puertas</a>
          <a className={stl.footer__link} href="#">Mobiliario infantil</a>
          <a className={stl.footer__link} href="#">Muebles de baño</a>
          <a className={stl.footer__link} href="#">Cocinas</a>
          <a className={stl.footer__link} href="#">Luminarias</a>
          <a className={stl.footer__link} href="#">Espejos</a>
          <a className={stl.footer__link} href="#">Pinturas</a>
          <a className={stl.footer__link} href="#">Paneles murales</a>
          <a className={stl.footer__link} href="#">Armario</a>
          <a className={stl.footer__link} href="#">Mobiliario de oficina</a>
          <a className={stl.footer__link} href="#">Arquitectura paramétrica</a>
          <a className={stl.footer__link} href="#">Vidrio</a>
          <a className={stl.footer__link} href="#">Pistikupesad</a>
        </div>
        <div className={stl.footer__links}>
          <h1 className={stl.footer__title}>Our services</h1>
          <a className={stl.footer__link} href="#">Design Services</a>
          <a className={stl.footer__link} href="#">Material calculation services</a>
          <a className={stl.footer__link} href="#">Installation services</a>
          <a className={stl.footer__link} href="#">EasySteps</a>
        </div>
        <div className={stl.footer__links}>
          <h1 className={stl.footer__title}>Policy</h1>
          <a className={stl.footer__link} href="#">Privacy</a>
          <a className={stl.footer__link} href="#">Terms & Conditions</a>
          <a className={stl.footer__link} href="#">Catálogos</a>
        </div>
        <div className={stl.footer__links}>
          <h1 className={stl.footer__title}>About us</h1>
          <a className={stl.footer__link} href="#">Escaleras</a>
          <a className={stl.footer__link} href="#">Muebles</a>
          <a className={stl.footer__link} href="#">Materiales de decoración</a>
          <a className={stl.footer__link} href="#">Stretch ceilings</a>
        </div>
        <div className={stl.contact}>
          <h1 className={stl.footer__title}>Contact us</h1>
          <div className={stl.contact__social}>
            <a className={stl.social__link} href="#"><Image width={20} height={20} src={Viber} alt="viber" /></a>
            <a className={stl.social__link} href="#"><Image width={20} height={20} src="/img/footer/telegram.svg" alt="telegram" /></a>
            <a className={stl.social__link} href="#"><Image width={20} height={20} src="/img/footer/twitter.svg" alt="twitter" /></a>
            <a className={stl.social__link} href="#"><Image width={20} height={20} src="/img/footer/linkedin.svg" alt="linkedin" /></a>
          </div>
          <div className={stl.wrapper}>
            <h2 className={stl.textLogo}>BRAVEX LLC</h2>
            <address className={stl.footer__address}>
            <a
              className={stl.address__link}
              href="https://maps.google.com/?q=Al. Bolestawa Krzywoustego, 40-870 Katowice"
              target="_blank"
              rel="noopener"
            >
              Al. Bolestawa Krzywoustego<br/>
              40-870 Katowice
            </a>
            </address>
          </div>
        </div>
      </div>

      <div className={stl.footer__bottom}>
        <div className={stl.footer__logo}><img src="/img/logo.svg" alt="BRAVEX" /></div>
        <div className={stl.payments}>
          <Image width={56} height={16} src="/img/footer/visa.svg" alt="visa" />
          <Image width={56} height={16} src="/img/footer/mastercard.svg" alt="mastercard" />
          <Image width={56} height={16} src="/img/footer/swift.svg" alt="swift" />
          <Image width={56} height={16} src="/img/footer/sepa.svg" alt="sepa" />
        </div>
        <div className={stl.bottom__links}>
          <p className={stl.bottom__link}>Privacy</p>
          <p className={stl.bottom__link}>Policy</p>
          <p className={stl.bottom__link}>Terms & Conditions</p>
        </div>
      </div>
    </footer>
  );
}
