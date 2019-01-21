'use babel';

export default {
  lastPress: 0,

  config: {
    delay: {
      title: 'Delay',
      description: 'Maximum delay between tapping shift in miliseconds',
      type: 'integer',
      default: 500,
      minimum: 1,
    }
  },

  activate() {
    const view = atom.views.getView(atom.workspace);

    view.addEventListener('keydown', e => this.keyDown(e));
  },

  keyDown(event) {
    if (event.key === "Shift" && this.tapShift()) {
      atom.commands.dispatch(event.target, 'command-palette:toggle')
    }
  },

  tapShift() {
    const delay = atom.config.get('shift-shift-command-palette.delay');
    const isFast = Date.now() - this.lastPress <= delay;

    this.lastPress = isFast ? 0 : Date.now();

    return isFast;
  },
};
