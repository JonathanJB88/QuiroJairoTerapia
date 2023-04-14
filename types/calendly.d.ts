declare global {
  interface Window {
    Calendly: {
      initBadgeWidget(options: object): void;
      initPopupWidget(options: object): void;
    };
  }
}

export {};
