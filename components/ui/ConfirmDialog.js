'use client'

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    CircularProgress,
} from '@mui/material'

/**
 * Presentational only — it owns no state and performs no action. You pass
 * `open` and the handlers; the dialog just asks the question.
 *
 * <ConfirmDialog
 *     open={open}
 *     onClose={() => setOpen(false)}
 *     onConfirm={handleDelete}
 *     title="Delete this machine?"
 *     description="Its documents and QR code will stop working. This cannot be undone."
 *     confirmLabel="Delete machine"
 *     destructive
 *     loading={deleting}
 * />
 */
export default function ConfirmDialog({
    open,
    onClose,
    onConfirm,
    title,
    description,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    destructive = false,
    loading = false,
}) {
    return (
        <Dialog
            open={open}
            onClose={loading ? undefined : onClose}
            maxWidth="xs"
            aria-labelledby="confirm-dialog-title"
        >
            <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>

            {description && (
                <DialogContent>
                    <DialogContentText variant="body2">{description}</DialogContentText>
                </DialogContent>
            )}

            <DialogActions>
                <Button onClick={onClose} disabled={loading} color="inherit">
                    {cancelLabel}
                </Button>
                <Button
                    onClick={onConfirm}
                    disabled={loading}
                    variant="contained"
                    color={destructive ? 'error' : 'primary'}
                    startIcon={loading ? <CircularProgress size={15} color="inherit" /> : null}
                >
                    {confirmLabel}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
