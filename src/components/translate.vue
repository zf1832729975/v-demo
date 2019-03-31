<template>
	<div id="translate" >
		<div id="translate-header">
			<h4>简单 / 易用 / 便捷</h4>
		</div>
		<!-- 翻译表单 -->
    <el-row :gutter="10" style="max-width: 835px; margin:15px 0;">
      <el-col :xs="9" :sm="7">
        <el-select v-model="srcLang">
          <el-option label="自动检测" value="auto"></el-option>
          <el-option v-for="lang in languages"
            :key="lang.value"
            :label="lang.label"
            :value="lang.value">
          </el-option>
        </el-select>
      </el-col>

      <el-col :xs="3" :sm="2">
        <i class="el-icon-sort exchange-lang" @click="exchangeLang" :disabled="srcLangIsAuto"></i>
      </el-col>
      <el-col :xs="7" :sm="7">
        <el-select v-model="toLang">
          <el-option v-for="lang in languages"
            :key="lang.value"
            :label="lang.label"
            :value="lang.value">
          </el-option>
        </el-select>
      </el-col>

      <el-col :xs="3" :sm="2">
        <el-button type="primary"
        @click.prevent="formSubmit">翻译
        </el-button>
      </el-col>
    </el-row>

    <!-- <el-form-item> -->
    <el-row class="content">
      <el-col  id="inputbox" :sm="12">
        <a href="javascript:;" @click="close" class="close" title="清空">
          <i class="el-icon-close"></i>
        </a>
        <el-input type="textarea"
          placeholder="请输入需要翻译的内容"
          v-model="srcText"
          :autosize="{ minRows: 4}"
          resize="none"
          prefix-icon=""
        >
        </el-input>
      </el-col>

      <!-- 预览 -->
      <el-col  class="preview" :sm="12">
        <div class="preview-inner">
          <p v-for="(line, index) in translation" :title="line.src" :key="index"> {{ line.dst }} </p>
        </div>
      </el-col>
    </el-row>

	</div>
</template>

<script >
import MD5 from '@/assets/js/md5.js'
import { myJsonp } from '@/utils/request.js'
import { urlencode } from '@/utils/url.js'
export default {
	name: 'translate',
	data () {
		return {
      test: '',
			srcText: '',
      translation: '',
      srcLangIsAuto: true,
      toLang: 'zh',
      srcLang: 'auto',
			languages: [
        {
          label: '英文',
          value: 'en'
        },
         {
          label: '中文',
          value: 'zh'
        },
         {
          label: '粤语',
          value: 'yue'
        },
         {
          label: '文言文',
          value: 'wyw'
        },
         {
          label: '日语',
          value: 'jp'
        },
         {
          label: '韩语',
          value: 'kor'
        },
         {
          label: '俄语',
          value: 'ru'
        },
         {
          label: '德语',
          value: 'de'
        },
         {
          label: '法语',
          value: 'fra'
        },
         {
          label: '西班牙语',
          value: 'spa'
        },
         {
          label: '泰语',
          value: 'th'
        }
      ]
		}
	},
  created () {
    this.toLang = localStorage.getItem('toLang') || 'zh'
  },
  watch: {
    srcText: 'formSubmit',
    srcLang: 'srcLangChange',
    toLang () {
      this.formSubmit()
      localStorage.setItem('toLang', this.toLang)
    }
  },
	methods: {
		formSubmit () {
			let post = {
				key: 'r63z0wZ2ZzleHcksQKxv',
				q: this.srcText,   	// 请求翻译的 query
				from: this.srcLang,  		// 翻译源语言 auto
				to: this.toLang,			// 译文语言
				appid: '20190322000280174',
				salt: (new Date).getTime(),
				sign: ''					// 签名 md5(appid+q+salt+密钥)
      }
			post.sign = MD5(post.appid + post.q + post.salt + post.key)

      post.q = urlencode(post.q)
      // vue-resource
      //  this.$http.jsonp('http://api.fanyi.baidu.com/api/trans/vip/translate', { params: post})
      //   .then( res  => {
        //     let data = res.data;
      //     console.log(res)
      //     this.translation = data.trans_result
      //   })

      // myJsonp

      myJsonp('http://api.fanyi.baidu.com/api/trans/vip/translate', post)
        .then(res => {
          // console.log(res)
          this.translation = res.data.trans_result
        })
    },
    close () {
      this.srcText = ''
      this.translation = ''
    },
    exchangeLang () {
      if (this.srcLangIsAuto) {return}
      let tmp = this.srcLang
      this.srcLang = this.toLang
      this.toLang = tmp
      this.formSubmit()
    },
    srcLangChange () {
      this.srcLangIsAuto = (this.srcLang === 'auto')
      this.formSubmit()
    }
	}
}
</script>

<style >
#translate{
  padding: 20px 10px;
  margin: 0 auto;
  max-width: 1280px;
}
#translate-header h4{
  color: #999;
  text-align: center;
}

.exchange-lang {
  transform: rotateZ(90deg);
  padding: 4px;
  font-size: 24px;
  color: #999;
}
.exchange-lang:hover {
  cursor: pointer;
}
.exchange-lang[disabled]:hover {
  cursor:not-allowed;;
}

.content {
  background: #ebe6e6;
}

#inputbox {
  position: relative;
   height: 100%;
}
#inputbox .el-textarea {
  height: 100%;
}
#inputbox .el-textarea textarea{
  padding-right: 30px;
  font-size: 20px;
  height: 100%;
}
.close {
  position: absolute;
  right: 10px;
  top: 5px;
  width: 25px;
  height: 25px;
  text-align: center;
  line-height: 25px;
}
.close:hover {
  border-radius: 50%;
  background: #eee;
  color: #999;
}
.preview {
  font-size: 20px;
  padding: 5px 15px;
}
</style>

