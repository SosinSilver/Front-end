<template lang="">
  <div style="position:absolute; left:0; background-color:rgba(0,0,0, 0.3); top:40px; z-index:10; width:100%; height:100%;">
    <div>
      {{ country_id }}
      이것은 특정 국가 입니다.
    </div>
    
  </div>
</template>
<script>
export default {
  name: 'Country',
  data: function() {
    return {
      country_id : this.$route.params.countryNum
    }
  },
  
}
</script>
<style lang="">
  
</style>