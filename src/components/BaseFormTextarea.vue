<template>
  <BaseFormField :title="title" :error="error">
    <label :for="title">
      <textarea class="form__input" type="text"
              :placeholder="placeholder"
              :name="title"
              v-model="dataValue">
      </textarea>
    </label>
  </BaseFormField>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  mixins: [formFieldMixin],
};
</script>
