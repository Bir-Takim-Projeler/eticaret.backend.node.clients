# eticaret.proto
## proto files for eticaret services


use this repository to provide .proto files for .backend.* services


## eticaret.backend.node

## delete old proto files

#### unix & macos
```shell
rm -r libs/proto
````

#### windows

```shell
Remove-Item –path $pwd/libs/proto –recurse
```

## Get new proto files
```shell 
npx degit https://github.com/takimbirprojeler/eticaret.proto libs/proto
```
