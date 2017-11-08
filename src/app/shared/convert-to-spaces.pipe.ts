import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name:'convertToSpaces'
})
export class ConvertToSpacesPipe implements PipeTransform{
    transform(value: string, character: string, ncharacter:string):string {
        return value.replace(character, ncharacter);
    }

}