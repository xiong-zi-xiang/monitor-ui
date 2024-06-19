<template>
  <div class="typing-effect">
    <span v-for="(char, index) in displayedText" :key="index">
      <span v-if="char === '\n'"><br/></span>
      <span v-else>{{ char }}</span>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    typingSpeed: {
      type: Number,
      default: 100 // 打字速度（毫秒）
    },
    deletingSpeed: {
      type: Number,
      default: 50 // 删除速度（毫秒）
    },
    pauseDuration: {
      type: Number,
      default: 4000 // 打字完毕后的暂停时间（毫秒）
    }
  },
  data() {
    return {
      displayedText: '',
      currentIndex: 0,
      isDeleting: false
    };
  },
  mounted() {
    this.startTyping();
  },
  methods: {
    startTyping() {
      if (!this.isDeleting && this.currentIndex < this.text.length) {
        this.displayedText += this.text.charAt(this.currentIndex);
        this.currentIndex++;
        setTimeout(this.startTyping, this.typingSpeed);
      } else if (this.isDeleting && this.currentIndex > 0) {
        this.displayedText = this.displayedText.substring(0, this.currentIndex - 1);
        this.currentIndex--;
        setTimeout(this.startTyping, this.deletingSpeed);
      } else if (this.currentIndex === this.text.length) {
        setTimeout(() => {
          this.isDeleting = true;
          this.startTyping();
        }, this.pauseDuration);
      } else if (this.currentIndex === 0) {
        this.isDeleting = false;
        setTimeout(this.startTyping, this.typingSpeed);
      }
    }
  }
};
</script>

<style scoped>
.typing-effect {
  font-family: 'Courier New', Courier, monospace;
  white-space: pre-wrap; /* Preserve whitespace and handle line breaks */
}
</style>
