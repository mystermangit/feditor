import utils from '../../utils';
import options from '../../options';

const opt = options.upload;
const errorOpt = {
        css: 'max-width: 360px;',
        type: 'danger',
    },
    limit = [],
    msg = {
        type: `仅支持以下类型：
                <ul>
                    <li>图片：${opt.type.image.join(', ')}</li>
                    <li>视频：${opt.type.video.join(', ')}</li>
                    <li>音频：${opt.type.audio.join(', ')}</li>
                    <li>其他：${opt.type.other.join(', ')}</li>
                </ul>`,
        size: `文件大小上限详情如下：
                <ul>
                    <li>图片：${opt.size.image}(MB)</li>
                    <li>视频：${opt.size.video}(MB)</li>
                    <li>音频：${opt.size.audio}(MB)</li>
                    <li>其他：${opt.size.other}(MB)</li>
                </ul>`
    };

for(let type in opt.type)
    if(opt.type.hasOwnProperty(type))
        opt.type[type].forEach(v=>{
            limit.push(v);
        });
class Files {
    constructor(){
        this.items = Object.create(null);
    }
    add(id, file){
        let ext = file.name.slice(file.name.lastIndexOf('.') + 1).toLowerCase(),
            type = file.type.split(/\//g)[0],
            size = (file.size / 1048576).toFixed(2);//MB

        //判断文件类型
        if (!limit.includes(ext)) {
            errorOpt.title = '格式错误';
            errorOpt.body = '不支持“'+ext+'”，'+msg.type;
            utils.dialog(errorOpt);
            return;
        }
        //判断文件大小
        if (size > opt.size[type]) {
            errorOpt.title = '文件过大';
            errorOpt.body = '文件“'+file.name+'大小（'+size+'MB）超出上限，'+msg.size;
            utils.dialog(errorOpt);
            return;
        }
        //判断相同的文件
        if (this.items[id]) {
            errorOpt.title = '文件重复';
            errorOpt.body = '文件“' + file.name + '”可能是重复的，请检查。';
            utils.dialog(errorOpt);
            return;
        }
        this.items[id] = file;
        return true;
    }
    remove(k){
        if(k){
            delete(this.items[k]);
        }else{
            for(k in this.items)
                delete(this.items[k]);
        }
    }
}
export default new Files();