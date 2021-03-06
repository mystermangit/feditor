import utils from '../utils';
import options from '../options';

let params = options.tools['fontsize'].params,
    len = params.length,
    i = 0,
    items = [];
for(; i<len; i++){
    items.push({
        css: 'font-size:'+params[i]+'px;white-space:nowrap;',
        html: params[i]+'px',
        data: {
            fontsize: params[i]+'px'
        }
    });
}
export default function(reditor, name, e){
    utils.menu({
        items,
        x: e.clientX,
        y: e.clientY,
        onclick(target){
            utils.exec({
                name: 'font-size',
                value: target.data(name),
                cmdName: 'fontsize',
                cmdValue: 1,
                range: reditor.range,
                context: reditor.edit,
                selector: ['[style*="font-size: x-small"]','font[size="1"]']
            });
        }
    });
}
