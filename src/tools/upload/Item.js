import options from '../../options';
import Files from './Files';
import Logo from './Logo';

class Items{
    static create(id){
        let o = Files.items[id].info,
            item = document.create('div'),
            nodes = {
                inner: document.create('div'),
                preview: document.create('div'),
                tick: document.create('div'),
                info: document.create('div'),
                filename: document.create('div'),
                form: document.create('form'),
                media: null
            },
            close = document.create('i');

        if(o.type === 'video' || o.type === 'audio'){
            nodes.media = document.create('video');
            nodes.media.innerHTML = '浏览器不支持';
        }else{
            nodes.media = document.create('div');
            if(o.type === 'image'){
                nodes.media.style = 'background:url('+o.src+') no-repeat center;background-size:contain;';
                nodes.preview.append(Logo.create(id));
            }else{
                nodes.media.className = 'noview';
                nodes.media.innerHTML = o.ext.toUpperCase();
            }
        }

        for(let k in nodes){
            if(k === 'media'){
                nodes[k].addClass('re-upload-item-'+k);
            }else{
                nodes[k].className = 're-upload-item-'+k;
            }
        }

        item.className = 're-upload-item';
        item.id = id;
        close.className = 're-close icon icon-close1';
        nodes.preview.addClass('alpha');
        nodes.tick.innerHTML = '已上传';
        nodes.filename.innerHTML = o.name || '';
        nodes.form.innerHTML = options.upload.form || '';
        let frag = document.create('div');
        frag.innerHTML = options.upload.form;
        console.log(frag.children);
        nodes.form.id = id + '-form';
        nodes.preview.append(nodes.media, nodes.tick);
        nodes.info.append(nodes.filename, nodes.form);
        nodes.inner.append(close, nodes.preview, nodes.info);
        item.append(nodes.inner);


        item.on('click', Items.clickHandler);
        return item;
    }
    static removeItem(item){
        item.off('click', Items.clickHandler);
        try{
            window.revokeURL(Files.items[item.id].info.src);
        }catch(err){}
        item.remove();
        Logo.remove(item.id);
        delete Files.items[item.id];
    }
    static clickHandler(e){
        let target = e.target;
        if(target.hasClass('re-close')){
            Items.removeItem(this);
        }
    }
    static remove(item){
        if(item){
            Items.removeItem(item);
        }else{
            for(let k in Files.items){
                Items.removeItem(document.getElementById(k));
            }
        }
    }
}
export default Items;