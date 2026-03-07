class ModalManager {
  constructor(modalId, openBtnId, closeBtnId) {
    this.modal = document.getElementById(modalId);
    this.openBtn = document.getElementById(openBtnId);
    this.closeBtn = document.getElementById(closeBtnId);
    this.setup();
  }

  setup() {
    if (!this.modal) return;
    
    if (this.openBtn) {
      this.openBtn.addEventListener('click', () => this.open());
    }
    
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }
    
    this.modal.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-overlay')) {
        this.close();
      }
    });
  }

  open() {
    if (!this.modal) return;
    this.modal.classList.remove('hidden');
    this.modal.classList.add('flex');
  }

  close() {
    if (!this.modal) return;
    this.modal.classList.add('hidden');
    this.modal.classList.remove('flex');
  }
}

class SubscriptionManager {
  constructor(joinModal, successModal) {
    this.joinModal = joinModal;
    this.successModal = successModal;
    this.init();
  }
  
  init() {
    this.watchForKitRecommendations();
    this.watchForSubscribeClick();
  }
  
  watchForSubscribeClick() {
    const handler = (e) => {
      const target = e.target;
      if (target.closest('#modal') || target.closest('.formkit-submit')) {
        const submitBtn = target.closest('.formkit-submit') || 
                          target.closest('button[type="submit"]');
        if (submitBtn) {
          this.hideKitOverlay();
        }
      }
    };
    
    document.addEventListener('click', handler, true);
  }
  
  watchForKitRecommendations() {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === 1) {
            this.checkForKitPopup(node);
          }
        }
      }
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
  }
  
  checkForKitPopup(node) {
    const selectors = ['.seva-overlay', '.formkit-overlay', '[data-object="overlay"]'];
    
    for (const selector of selectors) {
      const overlay = node.matches?.(selector) ? node : node.querySelector?.(selector);
      if (overlay) {
        setTimeout(() => {
          this.closeKitPopup();
          if (this.joinModal) this.joinModal.close();
          if (this.successModal) this.successModal.open();
        }, 100);
        return;
      }
    }
  }
  
  hideKitOverlay() {
    const existingStyle = document.getElementById('kit-hide-style');
    if (existingStyle) return;
    
    const style = document.createElement('style');
    style.id = 'kit-hide-style';
    style.textContent = `
      .seva-overlay, .formkit-overlay, [data-object="overlay"],
      .seva-modal, .formkit-modal, [data-object="modal"] {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
      }
    `;
    document.head.appendChild(style);
  }
  
  closeKitPopup() {
    const selectors = '.seva-overlay, .formkit-overlay, [data-object="overlay"], .seva-modal, .formkit-modal, [data-object="modal"]';
    document.querySelectorAll(selectors).forEach(el => el.remove());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const joinModal = new ModalManager('modal', 'joinBtn', 'closeModal');
  const successModal = new ModalManager('successModal', null, 'closeSuccessModal');
  
  const successCloseBtn = document.getElementById('successCloseBtn');
  if (successCloseBtn) {
    successCloseBtn.addEventListener('click', () => successModal.close());
  }
  
  new SubscriptionManager(joinModal, successModal);
  
  const form = document.querySelector('form[data-uid="e394d33f99"]');
  if (form) {
    form.addEventListener('submit', () => {
      setTimeout(() => {
        joinModal.close();
        successModal.open();
      }, 500);
    });
  }
});
