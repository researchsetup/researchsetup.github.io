Setup

        pip install jinja2 markdown2 fab

To edit the website:

1. **DO NOT EDIT html files DIRECTLY**
1. Create or edit a markdown (`.md`) file in `./templates`.  There is a default [./templates/index.md](./templates/index.md) already created for you.
2. Run the build script, which will generate html files with the same name as the `.md` files

        fab build

3. If you are happy build and push to the remote repo

        fab push

