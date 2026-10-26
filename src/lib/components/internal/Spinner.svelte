<span class="mc-spinner" aria-hidden="true"></span>

<style>
  .mc-spinner {
    display: block;
    box-sizing: border-box;
    inline-size: var(--mc-spinner-size, 1em);
    block-size: var(--mc-spinner-size, 1em);
    border: var(--mc-border-width-emphasised) solid currentColor;
    border-inline-end-color: transparent;
    border-radius: 50%;
    animation: mc-spinner-rotate var(--mc-motion-duration-processing) linear
      infinite;
  }

  @keyframes mc-spinner-rotate {
    to {
      transform: rotate(1turn);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .mc-spinner {
      animation: none;
    }
  }
</style>
