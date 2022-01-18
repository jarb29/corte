import { useState, useCallback } from 'react';
// material
import { styled } from '@mui/material/styles';
import { Card, Stack, Switch, Container, CardHeader, CardContent, FormControlLabel } from '@mui/material';
// routes
// components
import Page from '../Page';
import { UploadMultiFile } from '../upload';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

export default function UploadS3() {
  const [preview, setPreview] = useState(false);
  const [files, setFiles] = useState([]);

  const handleDropMultiFile = useCallback(
    (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    },
    [setFiles]
  );

  const handleRemoveAll = () => {
    setFiles([]);
  };

  const handleRemove = (file) => {
    const filteredItems = files.filter((_file) => _file !== file);
    setFiles(filteredItems);
  };

  return (
    <RootStyle title="Components: Upload | Minimal-UI">
      <Container maxWidth="lg">
        <Stack spacing={5}>
          <Card>
            <CardHeader
              title="Cargar archivos del modelo"
              action={
                <FormControlLabel
                  control={<Switch checked={preview} onChange={(event) => setPreview(event.target.checked)} />}
                  label="Show Preview"
                />
              }
            />
            <CardContent>
              <UploadMultiFile
                showPreview={preview}
                files={files}
                onDrop={handleDropMultiFile}
                onRemove={handleRemove}
                onRemoveAll={handleRemoveAll}
              />
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </RootStyle>
  );
}
