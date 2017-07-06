<template lang="html">
  <div class="CodeEditor">

    <div class="editor-option" v-show="controls">
      <span>Lenguaje:</span>

      <el-select v-model="selectedLanguage" placeholder="Lenguaje" :disabled="!isEditing">
        <el-option
          v-for="item in availableLanguages"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
    </div>

    <div class="editor-option right" v-show="controls">
      <span>Tema:</span>

      <el-select v-model="selectedTheme" placeholder="Tema">
        <el-option
          v-for="item in availableThemes"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
    </div>

    <div class="editor-wrapper" v-bind:style="{padding: `${controls ? 10 : 0}px 0`}">
      <div class="editor-body" v-bind:style="{ width: `${width}`, height: `${height}` }" ref="editorBody"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    code: { type: String, default: '// tu código \n' },
    language: { type: String, default: 'javascript' },
    theme: { type: String, default: 'monokai' },
    isEditing: { type: Boolean, default: false },
    width: { type: [Number, String], default: '100%' },
    height: { type: [Number, String], default: '50vh' },
    controls: { type: Boolean, default: true },
  },
  data() {
    return {
      codeValue: this.code,
      selectedLanguage: this.language,
      selectedTheme: this.theme,
      availableLanguages: [
        'abap',
        'abc',
        'actionscript',
        'ada',
        'apache_conf',
        'asciidoc',
        'assembly_x86',
        'autohotkey',
        'batchfile',
        'bro',
        'c_cpp',
        'c9search',
        'cirru',
        'clojure',
        'cobol',
        'coffee',
        'coldfusion',
        'csharp',
        'css',
        'curly',
        'd',
        'dart',
        'diff',
        'dockerfile',
        'dot',
        'drools',
        'dummy',
        'dummysyntax',
        'eiffel',
        'ejs',
        'elixir',
        'elm',
        'erlang',
        'forth',
        'fortran',
        'ftl',
        'gcode',
        'gherkin',
        'gitignore',
        'glsl',
        'gobstones',
        'golang',
        'graphqlschema',
        'groovy',
        'haml',
        'handlebars',
        'haskell',
        'haskell_cabal',
        'haxe',
        'hjson',
        'html',
        'html_elixir',
        'html_ruby',
        'ini',
        'io',
        'jack',
        'jade',
        'java',
        'javascript',
        'json',
        'jsoniq',
        'jsp',
        'jsx',
        'julia',
        'kotlin',
        'latex',
        'less',
        'liquid',
        'lisp',
        'livescript',
        'logiql',
        'lsl',
        'lua',
        'luapage',
        'lucene',
        'makefile',
        'markdown',
        'mask',
        'matlab',
        'maze',
        'mel',
        'mushcode',
        'mysql',
        'nix',
        'nsis',
        'objectivec',
        'ocaml',
        'pascal',
        'perl',
        'pgsql',
        'php',
        'pig',
        'powershell',
        'praat',
        'prolog',
        'properties',
        'protobuf',
        'python',
        'r',
        'razor',
        'rdoc',
        'rhtml',
        'rst',
        'ruby',
        'rust',
        'sass',
        'scad',
        'scala',
        'scheme',
        'scss',
        'sh',
        'sjs',
        'smarty',
        'snippets',
        'soy_template',
        'space',
        'sql',
        'sqlserver',
        'stylus',
        'svg',
        'swift',
        'tcl',
        'tex',
        'text',
        'textile',
        'toml',
        'tsx',
        'twig',
        'typescript',
        'vala',
        'vbscript',
        'velocity',
        'verilog',
        'vhdl',
        'wollok',
        'xml',
        'xquery',
        'yaml',
        'django',
      ],
      availableThemes: [
        'chrome',
        'clouds',
        'crimson_editor',
        'dawn',
        'dreamweaver',
        'eclipse',
        'github',
        'solarized_light',
        'textmate',
        'tomorrow',
        'xcode',
        'clouds_midnight',
        'cobalt',
        'idle_fingers',
        'kr_theme',
        'merbivore',
        'merbivore_soft',
        'mono_industrial',
        'monokai',
        'pastel_on_dark',
        'solarized_dark',
        'terminal',
        'tomorrow_night',
        'tomorrow_night_blue',
        'tomorrow_night_bright',
        'tomorrow_night_eighties',
        'twilight',
        'vibrant_ink',
      ],
    };
  },
  watch: {
    selectedLanguage: function (newLanguage) { // eslint-disable-line
      this.editor.getSession().setMode(`ace/mode/${newLanguage}`);
      this.$emit('languageChange', newLanguage);
    },
    selectedTheme: function (newTheme) {// eslint-disable-line
      this.editor.setTheme(`ace/theme/${newTheme}`);
    },
    isEditing: function (newValue) { // eslint-disable-line
      this.editor.setReadOnly(!newValue);
    },
  },
  mounted() {
    this.editor = window.ace.edit(this.$refs.editorBody);
    this.editor.setTheme(`ace/theme/${this.selectedTheme}`);
    this.editor.getSession().setMode(`ace/mode/${this.selectedLanguage}`);
    this.editor.setValue(this.codeValue, 1);
    this.editor.setReadOnly(!this.isEditing);
    this.editor.$blockScrolling = Infinity;

    this.editor.renderer.setShowGutter(this.controls);

    this.editor.getSession().on('change', () => {
      this.codeValue = this.editor.getValue();
      this.$emit('input', this.codeValue);
    });
  },
  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>

<style lang="scss">
.CodeEditor {
  .editor-wrapper {
    position: relative;
  }
  .editor-option {
    display: inline-block;

    &.right {
      float: right;
    }
  }
}
</style>
