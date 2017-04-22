
   
        import { deserialize, deserializeAs } from 'cerialize';
   
        export class Element {
            @deserialize text: string;
            @deserialize elements: Array<Element>;
            constructor(text : string, elements : Array<Element>) {
                this.text = name;
                this.elements = elements;
            }
        }
        
        export class Content {
            @deserialize type: string;
            @deserialize text: string;
            
            @deserialize Element
            elements: Array<Element>;

            constructor(type : string, text : string, elements : Array<Element>) {
                this.type = type;
                this.text = text;
                this.elements = elements;
            }
        }
        
        export class Image {
            @deserialize src: string;
            @deserialize caption: string;

            constructor(src : string, caption : string) {
                this.src = src;
                this.caption = caption;
            }
        }
        
        export class Section {
            @deserialize title: string;
            @deserialize level: number;
            
            @deserializeAs(Content)
            content: Array<Content>;
            
            @deserializeAs(Image)
            images: Array<Image>;

            constructor(title : string, level : number, content:Array<Content>, images: Array<Image>) {
                this.title = title;
                this.level = level;
                this.content = content;
                this.images = images;
            }
        }

        export class RootObject {
            @deserialize public title?: string;
            @deserialize public level?: number;
            @deserialize public thumbnail?: string;
            @deserialize public id?: number;
            
            @deserializeAs(Content)
            content?: Array<Content>;
            
            @deserializeAs(Image)   
            images?: Array<Image>;
            
            @deserializeAs(Section)    
            sections?:  Array<Section>;
            
            constructor(title : string, level : number, thumbnail: string, content:Array<Content>, images: Array<Image>, sections:Array<Section>, id:number) {
                this.title = title;
                this.level = level;
                this.thumbnail = thumbnail;
                this.content = content;
                this.images = images;
                this.sections = sections;
                this.id = id;
            }
        }
        
      