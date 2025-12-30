import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const DataTable = ({ kosts, onDeleteKost }) => {
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    kostId: null,
    kostData: null,
  })

  const handleDeleteClick = (id) => {
    const kostToDelete = kosts.find(kost => kost.id === id)
    setDeleteModal({
      isOpen: true,
      kostId: id,
      kostData: kostToDelete,
    })
  }

  const handleConfirmDelete = () => {
    onDeleteKost(deleteModal.kostId)
    console.log(`Kost dengan ID ${deleteModal.kostId} dihapus`)
    setDeleteModal({
      isOpen: false,
      kostId: null,
      kostData: null,
    })
  }

  const handleCancelDelete = () => {
    setDeleteModal({
      isOpen: false,
      kostId: null,
      kostData: null,
    })
  }

  return (
    <>
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="text-2xl">Daftar Kost</CardTitle>
          <CardDescription>
            Total: {kosts.length} kost terdaftar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Nama Kost</TableHead>
                  <TableHead>Lokasi</TableHead>
                  <TableHead className="text-right">Harga</TableHead>
                  <TableHead>Fasilitas</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {kosts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      Belum ada data kost
                    </TableCell>
                  </TableRow>
                ) : (
                  kosts.map((kost) => (
                    <TableRow key={kost.id} className="group hover:bg-muted/50">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-lg object-cover border"
                              src={kost.image}
                              alt={kost.name}
                            />
                          </div>
                          <div>
                            <p className="font-semibold">{kost.name}</p>
                            <p className="text-xs text-muted-foreground">
                              ID: {kost.id}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm">{kost.location}</p>
                          {kost.city && (
                            <Badge variant="outline" className="text-xs">
                              {kost.city}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="space-y-1">
                          <p className="font-bold text-primary">
                            Rp {kost.price.toLocaleString()}
                          </p>
                          {kost.discount > 0 && (
                            <p className="text-xs text-muted-foreground line-through">
                              Rp {kost.originalPrice?.toLocaleString()}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {kost.facilities.slice(0, 2).map((facility, index) => (
                            <Badge 
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {facility}
                            </Badge>
                          ))}
                          {kost.facilities.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{kost.facilities.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => console.log(`Edit kost ${kost.id}`)}
                            className="h-8 px-3"
                          >
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteClick(kost.id)}
                            className="h-8 px-3"
                          >
                            Hapus
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Shadcn UI Alert Dialog for Delete Confirmation */}
      <AlertDialog open={deleteModal.isOpen} onOpenChange={handleCancelDelete}>
        <AlertDialogContent className="sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <svg 
                className="h-5 w-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.938 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              Hapus Kost?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Kost akan dihapus secara permanen dari sistem.
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          {deleteModal.kostData && (
            <div className="bg-muted/50 p-4 rounded-lg space-y-3">
              <div className="flex items-center gap-3">
                <img
                  className="h-10 w-10 rounded-lg object-cover"
                  src={deleteModal.kostData.image}
                  alt={deleteModal.kostData.name}
                />
                <div className="space-y-1">
                  <p className="font-semibold text-sm">
                    {deleteModal.kostData.name}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {deleteModal.kostData.location}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Rp {deleteModal.kostData.price?.toLocaleString()}/bulan
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="text-sm space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-muted-foreground">Fasilitas:</span>
                  <div className="flex flex-wrap gap-1">
                    {deleteModal.kostData.facilities.slice(0, 3).map((facility, index) => (
                      <span key={index} className="text-xs bg-secondary px-2 py-0.5 rounded">
                        {facility}
                      </span>
                    ))}
                    {deleteModal.kostData.facilities.length > 3 && (
                      <span className="text-xs text-muted-foreground">
                        +{deleteModal.kostData.facilities.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <AlertDialogFooter>
            <AlertDialogCancel className="mt-2 sm:mt-0">Batal</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Hapus Permanen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default DataTable